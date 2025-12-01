import { CompanyContext, StyleGuide } from "../schema";

function formatStyleGuide(styleGuide: StyleGuide): string {
  return `
<linguistic_signature>
  <profile_name>${styleGuide.voice_profile_name}</profile_name>
  <master_instruction>${styleGuide.system_instructions}</master_instruction>
  <rules>
    <vocabulary>${styleGuide.style_rules.vocabulary}</vocabulary>
    <sentence_structure>${styleGuide.style_rules.sentence_structure}</sentence_structure>
    <formatting>${styleGuide.style_rules.formatting}</formatting>
    <perspective>${styleGuide.style_rules.perspective}</perspective>
  </rules>
  <strict_negative_constraints>
    ${styleGuide.negative_constraints.map((c) => `- ${c}`).join("\n")}
  </strict_negative_constraints>
</linguistic_signature>
`;
}

export function generateToneAnalysisPrompt(companyContext: CompanyContext) {
  return `### SYSTEM ROLE
You are a Computational Linguist and Expert Brand Voice Strategist. Your goal is to reverse-engineer a "Linguistic Signature" based on provided writing samples and a target brand persona.

### INPUT DATA
1. **Stated Brand Tone:** ${companyContext.companyVoiceTone}
2. **Target Audience:** ${companyContext.targetAudienceJobTitle}
3. **Writing Samples:**
"""
${companyContext.companyContentTemplate.join("\n\n---\n\n")}
"""

### TASK
Analyze the provided samples in the context of the Stated Brand Tone. Extract a precise style guide that an LLM can use to mimic this voice perfectly.

### ANALYSIS DIMENSIONS
1. **Vocabulary Density:** Does the writer use complex B2B jargon or simple, plain English?
2. **Sentence Structure:** Is it punchy and fragmented? Or long, flowery, and academic?
3. **Perspective:** First-person plural ("We"), second person ("You"), or third person?
4. **Formatting Habits:** Heavy use of bolding? Emojis? Bullet points?
5. **Tone Reconciliation:** How does the writing actually feel compared to the Stated Brand Tone? (Synthesize the two).

### OUTPUT FORMAT
Output ONLY a raw JSON object with the following schema. Do not output markdown code blocks or text outside the JSON.

{
  "voice_profile_name": "Short name for this style (e.g., 'Friendly Expert')",
  "system_instructions": "A compact paragraph describing exactly how the AI should write to match this voice.",
  "style_rules": {
    "vocabulary": "Specific instruction on word choice (e.g., 'Use strong verbs, avoid adverbs, use SaaS terminology').",
    "sentence_structure": "Specific instruction on rhythm (e.g., 'Vary sentence length. Use short sentences for impact.')",
    "formatting": "Instructions on visual structure (e.g., 'Use frequent headers, bullet points for lists, no emojis').",
    "perspective": "e.g., 'Speak directly to the reader using 'You'.' "
  },
  "negative_constraints": [
    "List of 3-5 things strictly forbidden based on the samples (e.g., 'Never start sentences with 'In today's world'', 'No exclamation marks', 'No passive voice')."
  ],
  "few_shot_examples": [
    "Extract 2 very short, high-quality sentences from the samples that perfectly capture the vibe."
  ]
}`;
}

export function generateSystemPrompt(
  companyContext: CompanyContext,
  mode: string,
) {
  // Logic: Prefer the specific StyleGuide, fallback to generic Tone/Examples
  const voiceEngine = companyContext.styleGuide
    ? formatStyleGuide(companyContext.styleGuide)
    : `<generic_voice_settings>
         <tone>${companyContext.companyVoiceTone}</tone>
         ${
           companyContext.companyContentTemplate &&
           companyContext.companyContentTemplate.length > 0
             ? `<reference_examples>\n${companyContext.companyContentTemplate
                 .slice(0, 2)
                 .map((ex, i) => `<ex_${i}>${ex}</ex_${i}>`)
                 .join("\n")}\n</reference_examples>`
             : ""
         }
       </generic_voice_settings>`;

  return `<system_role>
You are an expert B2B SaaS Copywriter acting as the dedicated brand voice for "${companyContext.companyName}".
Your goal is to execute the user's request with high fidelity to the company's strategic positioning and specific linguistic signature.
</system_role>

<company_knowledge_base>
  <product_context>
    <description>${companyContext.companyProductDescription}</description>
    <industry>${companyContext.companyIndustry}</industry>
  </product_context>

  <target_audience>
    <persona>${companyContext.targetAudienceJobTitle || "B2B Decision Makers"}</persona>
    <tech_level>${companyContext.targetAudienceTechnicalLevel || "Semi-Technical"}</tech_level>
  </target_audience>

  <strategic_core>
    ${companyContext.companyKeyDifferentiator ? `<unique_selling_prop>${companyContext.companyKeyDifferentiator}</unique_selling_prop>` : ""}
    ${
      companyContext.companyProductBenefits &&
      companyContext.companyProductBenefits.length > 0
        ? `<core_benefits>\n${companyContext.companyProductBenefits.map((b) => `- ${b}`).join("\n")}\n</core_benefits>`
        : ""
    }
  </strategic_core>
</company_knowledge_base>

<brand_voice_engine>
  ${voiceEngine}
</brand_voice_engine>

<mode_configuration>
  <current_mode>${getModeLabel(mode)}</current_mode>
  <framework_instruction>
    ${getFrameworkGuidance(mode)}
  </framework_instruction>
</mode_configuration>

<quality_assurance_protocols>
1. **Differentiator Check:** Ensure the content implicitly or explicitly reinforces why we are different: "${companyContext.companyKeyDifferentiator || "Our unique value"}".
2. **Hallucination Check:** Do not invent features not listed in <core_benefits>.
3. **Format Check:** Strictly follow the Markdown structure defined in the user prompt.
4. **Tone Check:** If the Style Guide says "No fluff", delete all adjectives that do not add specific meaning.
</quality_assurance_protocols>`;
}

export function generateUserPrompt(userInput: string, mode: string) {
  const formatInstructions = getFormatInstructions(mode);

  // Researcher Strategy: "Chain of Thought"
  // We force the model to plan silently for complex tasks (Blogs), preventing rambling.
  const thinkingStep =
    mode === "blog_writer"
      ? `STEP 1 (HIDDEN): Silently outline the logical flow of arguments based on the "Inverted Pyramid" framework. Do not output this outline.`
      : `STEP 1 (HIDDEN): Briefly analyze the best angle to convert/persuade the reader.`;

  return `<task_trigger>
${userInput}
</task_trigger>

<execution_protocol>
${thinkingStep}

STEP 2 (VISIBLE): Generate the FINAL OUTPUT immediately.
Do not write meta-commentary like "Here is the draft."
Start directly with the content following this exact format:

${formatInstructions}
</execution_protocol>`;
}

function getModeLabel(mode: string): string {
  switch (mode) {
    case "blog_writer":
      return "Blog Post Writer";
    case "product_update_writer":
      return "Product Update Writer";
    case "landing_page_writer":
      return "Landing Page Writer";
    case "email_writer":
      return "Email Writer";
    default:
      return "Content Writer";
  }
}
function getFrameworkGuidance(mode: string): string {
  switch (mode) {
    case "blog_writer":
      return `Use the **Inverted Pyramid** or **Problem-Agitation-Solution** framework.
      - Start with the "Meat": The most important insight goes first.
      - Use H2s to break up arguments.
      - Every paragraph must deliver value (no fluff).
      - Conclude with a strategic tie-in to the product benefits.`;

    case "product_update_writer":
      return `Use the **What-Why-How** framework.
      - WHAT: Concisely state the change.
      - WHY: Translate the technical change into a business benefit immediately.
      - HOW: Give 1 clear instruction on how to use it.`;

    case "landing_page_writer":
      return `Use the **Jobs-To-Be-Done (JTBD)** framework.
      - Focus on the OUTCOME, not the feature.
      - Use "You" phrasing.
      - Address objections preemptively in the copy.`;

    case "email_writer":
      return `Use the **BAB (Before - After - Bridge)** framework.
      - Before: Their current painful state.
      - After: The zen state of using our product.
      - Bridge: Our product is the path between them.
      - Keep it under 200 words.`;

    default:
      return "Write clearly and professionally.";
  }
}

// function getFrameworkGuidance(mode: string): string {
//   switch (mode) {
//     case "blog_writer":
//       return `For blog posts, use these frameworks:
// - **Problem-Solution**: Identify audience problem, explore why it matters, provide actionable solutions
// - **Inverted Pyramid**: Start with most important information, then supporting details, then background
// - **Listicle**: When appropriate, use "X Ways to..." format for scannable, digestible content

// Structure content to be:
// - SEO-optimized with clear, benefit-driven title
// - Front-loaded with key takeaways
// - Broken into clear sections with descriptive H2 headings
// - Supported with examples, data, or customer stories
// - Concluded with clear next steps or CTA`;

//     case "product_update_writer":
//       return `For product updates, use the What-Why-How framework:
// - **What**: Clearly describe what changed or was added
// - **Why**: Explain the business benefit and why it matters to users
// - **How**: Provide clear instructions on how to use or access the new feature

// Keep it:
// - Clear and concise (300-500 words)
// - Focused on user benefits, not technical specs
// - Action-oriented with specific next steps`;

//     case "landing_page_writer":
//       return `For landing pages, use AIDA (Attention, Interest, Desire, Action) or PAS (Problem-Agitate-Solve):
// - **Hero**: Grab attention with benefit-driven headline and clear value proposition
// - **Problem**: Address the specific pain point your audience faces
// - **Solution**: Show how your product uniquely solves it
// - **Features**: Translate features into tangible benefits
// - **Social Proof**: Build credibility with testimonials or results
// - **CTA**: Clear, specific action with low friction

// Focus on:
// - Conversion-optimized structure
// - Benefit-driven copy over feature lists
// - Addressing objections preemptively
// - Multiple clear CTAs throughout`;

//     case "email_writer":
//       return `For emails, use PAS (Problem-Agitate-Solve) or BAB (Before-After-Bridge) depending on the user request:
// - **Subject Line**: Create 3 options - curiosity-driven, benefit-focused, urgency-based
// - **Hook**: Grab attention in first sentence
// - **Body**: 2-3 short paragraphs delivering value
// - **CTA**: One clear, specific action

// Keep it:
// - Brief (150-250 words for body)
// - Scannable with short paragraphs
// - Focused on one main message
// - Action-oriented with single clear CTA`;

//     default:
//       return "Apply appropriate B2B content frameworks based on the specific request and content type.";
//   }
// }
function getFormatInstructions(mode: string): string {
  switch (mode) {
    case "blog_writer":
      return `<output_format>
# [SEO-Optimized Title]

**Meta Description:** [150-160 chars]

[Introduction: Hook + Thesis]

## [H2: Main Point 1]
[Content]

## [H2: Main Point 2]
[Content]

## [H2: Main Point 3]
[Content]

## Conclusion
[Summary + Soft CTA]
</output_format>`;

    case "product_update_writer":
      return `<output_format>
# [Update Name]

**TL;DR**
[1 sentence summary of value]

**The Update**
[Details of what changed]

**Why it Matters**
[Business value explanation]

**How to Use**
1. [Step 1]
2. [Step 2]
</output_format>`;

    case "landing_page_writer":
      return `<output_format>
# [Headline: 6-10 words, benefit driven]
## [Subheadline: Clarify the specific value/differentiator]
**CTA Primary:** [Action Text]

* [Problem 1]
* [Problem 2]
* [Problem 3]

### [Solution Header]
[Paragraph explaining the "Bridge"]

1. **[Feature Name]**: [Benefit description]
2. **[Feature Name]**: [Benefit description]
3. **[Feature Name]**: [Benefit description]

**Headline:** [Closing Argument]
**Button:** [Action Text]
</output_format>`;

    case "email_writer":
      return `<output_format>
**Subject A (Curiosity):** ...
**Subject B (Benefit):** ...
**Subject C (Direct):** ...

---
**Email Body:**

[Greeting]

[Hook]

[Value Prop / Bridge]

[CTA]

[Sign-off]
</output_format>`;

    default:
      return "markdown";
  }
}
// function getFormatInstructions(mode: string): string {
//   switch (mode) {
//     case "blog_writer":
//       return `<output_format>
// # [SEO-Optimized Title]

// **Meta Description:** [150-160 character description]

// [Introduction paragraph - hook the reader with the problem or key insight]

// ## [First Main Section H2]
// [Content with 2-3 short paragraphs, include examples or data where relevant]

// ## [Second Main Section H2]
// [Content with 2-3 short paragraphs, include examples or data where relevant]

// ## [Third Main Section H2]
// [Content with 2-3 short paragraphs, include examples or data where relevant]

// ## [Conclusion H2]
// [Wrap-up paragraph with clear CTA]

// Target: 1200-1500 words total
// </output_format>`;

//     case "product_update_writer":
//       return `<output_format>
// # [Clear Update Headline]

// **What's New:**
// [2-3 sentences on what changed]

// **Why It Matters:**
// [2-3 sentences on benefits to users - focus on business impact]

// **How to Use It:**
// [Step-by-step instructions or where to find it]

// **What You Need to Do:**
// [Any required actions, or "Nothing! It's live now."]

// [Optional: Link to documentation or support resources]

// Target: 300-500 words total
// </output_format>`;

//     case "landing_page_writer":
//       return `<output_format>

// ## HERO SECTION
// **Headline:** [Benefit-driven, max 10 words]
// **Subheadline:** [Clarify value proposition, max 20 words]
// **CTA Button:** [Action text]

// ## PROBLEM
// [2-3 sentences addressing the pain point your audience faces]

// ## SOLUTION
// [3-4 sentences on how your product solves it uniquely]

// ## KEY FEATURES
// **[Feature 1 Name]:** [Benefit in one sentence]
// **[Feature 2 Name]:** [Benefit in one sentence]
// **[Feature 3 Name]:** [Benefit in one sentence]

// ## SOCIAL PROOF
// [Testimonial quote or "X companies trust us to..." stat with specific result]

// ## WHY CHOOSE US
// [2-3 sentences emphasizing your key differentiator]

// ## FINAL CTA
// **Headline:** [Action-oriented, benefit-focused]
// **CTA Button:** [Action text]

// </output_format>`;

//     case "email_writer":
//       return `<output_format>

// **SUBJECT LINE OPTIONS:**
// 1. [40-50 chars - curiosity-driven]
// 2. [40-50 chars - benefit-focused]
// 3. [40-50 chars - urgency/FOMO]

// **PREVIEW TEXT:** [80-100 chars that complements subject line]

// ---

// **EMAIL BODY:**

// [Greeting]

// [Hook sentence - grab attention with problem or insight]

// [2-3 short paragraphs delivering the main message]

// [Clear CTA with link/button text]

// [Friendly sign-off]
// [Name/Team]

// P.S. [Optional reinforcement or secondary point]

// ---

// Target: 150-250 words for body
// </output_format>`;

//     default:
//       return "<output_format>Generate the complete content based on the request.</output_format>";
//   }
// }
