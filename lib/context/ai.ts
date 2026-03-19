"use server";

import { google } from "@ai-sdk/google";
import { generateObject, generateText, streamText } from "ai";
import { CompanyContext } from "../schema";
import getUserPersona from "@/utils/actions/companies.actions";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { createClient } from "../supabase/server";
import { createStreamableValue } from "@ai-sdk/rsc";
import { updateContent } from "@/utils/actions/content.action";
import { createBrandVoicePrompt } from "./prompts";

// Import payment logic
import { canUserGenerate, incrementGenerationCount } from "../payments";

export async function generateDraftAction(draftId: string) {
  const supabase = await createClient();
  const stream = createStreamableValue("");

  (async () => {
    // 1. Fetch Draft & Brand Context securely on the server
    const { data: draft } = await supabase
      .from("user_content")
      .select("*")
      .eq("id", draftId)
      .single();

    const { data: brand } = await supabase
      .from("user_company")
      .select("*")
      .eq("user_id", draft.user_id)
      .single();

    if (!draft || !brand) {
      stream.done();
      return;
    }

    // --- PAYMENT CHECK START ---
    // Check if the user (owner of the draft) has credits remaining
    const { allowed, reason } = await canUserGenerate(draft.user_id);

    if (!allowed) {
      // Stream the error message to the client and close the stream
      stream.error(reason || "Usage limit reached. Please upgrade your plan.");
      stream.done();
      return;
    }
    // --- PAYMENT CHECK END ---

    // 2. Build the System Prompt (The Brain)
    const systemPrompt = createBrandVoicePrompt(brand, draft.mode);

    // 3. Build the User Prompt (The Task)
    const userPrompt = `
          TASK: Write a ${draft.mode.replace("_", " ")}.
          INPUTS: ${JSON.stringify(draft.input_context)}

          CRITICAL OUTPUT RULES:
          1. Write EXACTLY ONE version. Do not provide options.
          2. Do NOT include conversational filler (e.g., "Here is the draft").
          3. Start directly with the content (e.g., The Subject Line for emails, or the H1 for blogs).
          4. Stop immediately after the sign-off/conclusion.

          INSTRUCTION: Write the content now. Adhere strictly to the banned words list.
        `;

    // 4. Stream the text
    const { textStream } = streamText({
      model: google("gemini-2.5-flash-lite"),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      onFinish: async ({ text }) => {
        // Save content
        await updateContent(draftId, text);

        // --- PAYMENT INCREMENT START ---
        // Only increment if the generation successfully finishes
        await incrementGenerationCount(draft.user_id);
        // --- PAYMENT INCREMENT END ---
      },
    });

    // 5. Pipe the chunks to the client
    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}

export async function refineTextAction(selection: string, prompt: string) {
  const stream = createStreamableValue("");
  const supabase = await createClient();

  (async () => {
    // 1. Get Current User for Usage Tracking
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      stream.error("Unauthorized");
      stream.done();
      return;
    }

    // --- PAYMENT CHECK START ---
    const { allowed, reason } = await canUserGenerate(user.id);

    if (!allowed) {
      stream.error(reason || "Usage limit reached. Please upgrade your plan.");
      stream.done();
      return;
    }
    // --- PAYMENT CHECK END ---

    const { textStream } = streamText({
      model: google("gemini-2.5-flash-lite"),
      system:
        "You are an expert AI editor for B2B professionals. You rewrite text to be clear, concise, and impactful while maintaining a professional tone. \n\n" +
        "Rules:\n" +
        "1. Output ONLY the rewritten text. No conversational filler (e.g., 'Here is the text').\n" +
        "2. Preserve existing Markdown formatting (bold, italics, lists) unless asked to remove it.\n" +
        "3. Do not change the underlying meaning unless the instruction explicitly requires it.",
      prompt: `
        <original_text>
        ${selection}
        </original_text>

        <instruction>
        ${prompt}
        </instruction>

        Rewrite the <original_text> following the <instruction>.
      `,
      onFinish: async () => {
        // --- PAYMENT INCREMENT START ---
        await incrementGenerationCount(user.id);
        // --- PAYMENT INCREMENT END ---
      },
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
