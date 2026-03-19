import { CompanyContext } from "../schema";

export type GeneratorMode =
  | "product_update"
  | "blog_post"
  | "email_sequence"
  | "landing_page";

// ==========================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================

const DEFAULT_BANNED_WORDS = [
  "delve",
  "tapestry",
  "landscape",
  "elevate",
  "game-changer",
  "unlock",
  "unleash",
  "synergy",
  "robust",
  "cutting-edge",
  "revolutionize",
  "thrilling",
  "excited to announce",
  "in today's world",
  "foster",
  "spearhead",
  "deep dive",
];

// ==========================================
// 2. UTILITY FUNCTIONS
// ==========================================

/**
 * SECURITY: Basic sanitizer to prevent Prompt Injection.
 * Escapes XML-significant characters so user input is treated as data, not code.
 */
function sanitize(input: string | undefined): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Returns the "Gold Standard" sample based on mode.
 */
function getReferenceSample(
  context: CompanyContext,
  mode: GeneratorMode,
): string {
  switch (mode) {
    case "product_update":
      return context.sample_update || "";
    case "blog_post":
      return context.sample_blog || "";
    case "email_sequence":
      return context.sample_email || "";
    case "landing_page":
      return context.sample_landing || "";
    default:
      return "";
  }
}

/**
 * Returns the specific strategic framework instructions.
 */
function getStrategicFramework(mode: GeneratorMode): string {
  switch (mode) {
    case "email_sequence":
      return `
      STRATEGY: The "Spear" Framework (Short, Personal, Expecting A Reply).
      1. THE HOOK: Acknowledge a specific problem or observation immediately. No "I hope you are well."
      2. THE BRIDGE: Connect that problem to our solution in one sentence.
      3. THE ASK: Low-friction Call to Action (e.g., "Worth a conversation?" or "Open to a demo?").

      CONSTRAINT: Keep it under 125 words. Optimize for mobile reading.`;

    case "product_update":
      return `
      STRATEGY: The "FAB" Framework (Features, Advantages, Benefits).
      1. FEATURE: What specifically changed? (The "What")
      2. ADVANTAGE: How does this make the product better? (The "How")
      3. BENEFIT: What is the financial or operational impact? (The "So What?")

      CONSTRAINT: Frame every update as momentum. No dry lists.`;

    case "landing_page":
      return `
      STRATEGY: The "Value Stack".
      1. HEADLINE: A specific promise of transformation (e.g., "Cut AWS bills by 30%").
      2. SUBHEAD: The mechanism of how we achieve that promise.
      3. BULLETS: 3 specific proofs or capabilities.
      4. CTA: Action-oriented verb.

      CONSTRAINT: Focus strictly on the "After State" (life after using the product).`;

    case "blog_post":
    default:
      return `
      STRATEGY: The "PAS" Framework (Problem - Agitation - Solution).
      1. PROBLEM: State the painful status quo clearly.
      2. AGITATION: Twist the knife. Explain why this costs money/time.
      3. SOLUTION: Present our approach as the inevitable logic.

      CONSTRAINT: Write with a strong opinion. Be contrarian.`;
  }
}

// ==========================================
// 3. CORE PROMPT ENGINE
// ==========================================

export function createBrandVoicePrompt(
  context: CompanyContext,
  mode: GeneratorMode,
): string {
  // 1. Prepare Data
  const rawSample = getReferenceSample(context, mode);
  const frameworkStrategy = getStrategicFramework(mode);

  // 2. Calculate Banned Words (Set logic handles duplicates)
  const userBannedList = (context.banned_words || "")
    .split(",")
    .map((w) => w.trim());
  const allBanned = Array.from(
    new Set([...DEFAULT_BANNED_WORDS, ...userBannedList]),
  )
    .filter((w) => w.length > 0)
    .join(", ");

  // 3. Determine Style Instructions (Chain of Thought approach)
  const styleInstruction =
    rawSample.length > 50
      ? `
    <style_processing>
      <instruction>
        Analyze the "Reference Material" below. Before writing the final content,
        you must generate a hidden <scratchpad> block where you define:
        1. The Sentence Rhythm (Staccato vs. Flowing).
        2. The Jargon Level (Developer vs. C-Suite).
        3. The Attitude (Helper vs. Challenger).

        Then, apply these traits to the generated content.
      </instruction>
      <reference_material>
        "${sanitize(rawSample)}"
      </reference_material>
    </style_processing>`
      : `
    <style_processing>
      <instruction>
        No reference provided. Default to "High-Agency B2B" voice:
        - Sentences: Short, declarative, punchy.
        - Tone: Confident, expert, slightly contrarian.
        - Structure: One main idea per paragraph.
      </instruction>
    </style_processing>`;

  // 4. Assemble the System Prompt
  // Note: We use XML tags heavily here as modern LLMs (Claude/GPT-4) parse them
  // better than Markdown headers for strict instruction following.
  return `
### SYSTEM ROLE
You are an expert B2B Growth Architect. You prioritize revenue and clarity over cleverness.
You strictly adhere to the Identity and Constraints provided below.

### 1. IDENTITY MATRIX (Source of Truth)
<identity>
  <user_term>${sanitize(context.user_term)}</user_term>
  <product_term>${sanitize(context.product_term)}</product_term>
  <enemy>${sanitize(context.enemy)}</enemy>
  <core_benefit>${sanitize(context.core_benefit)}</core_benefit>
</identity>

### 2. STRATEGIC BLUEPRINT
<strategy>
  ${frameworkStrategy}
</strategy>

### 3. VOICE & STYLE
${styleInstruction}

### 4. NEGATIVE CONSTRAINTS
<banned_vocabulary>
  The following words represent low-quality writing and are strictly forbidden:
  [${allBanned}]
</banned_vocabulary>

<banned_patterns>
  - No Rhetorical Questions as openers (e.g., "Tired of...?").
  - No "Marketing Fluff" (e.g., "In the fast-paced digital landscape...").
  - No generic transitions (e.g., "Furthermore", "Moreover").
  - No exclamation marks unless explicitly required by the reference sample.
</banned_patterns>

### 5. OUTPUT INSTRUCTIONS
1. Analyze the input and strategy in your head.
2. Generate the content following the framework.
3. **CRITICAL:** Output ONLY the raw Markdown. Do not include introductory text like "Here is the draft."
`;
}
