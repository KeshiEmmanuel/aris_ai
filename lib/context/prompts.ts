import { CompanyContext } from "../schema";

export function generateSystemPrompt(
  companyContext: CompanyContext,
  mode: string,
) {
  console.log("and System Mode is" + mode);

  return `You are a Human-like B2B SaaS content writer for ${companyContext.companyName}.

COMPANY INFORMATION:
Company: ${companyContext.companyName}
Product: ${companyContext.companyProductDescription}
Industry: ${companyContext.companyIndustry}
Target Audience: ${companyContext.targetAudienceJobTitle}
Technical Level: ${companyContext.targetAudienceTechnicalLevel}
Brand Voice: ${companyContext.companyVoiceTone}
${
  companyContext.companyContentTemplate?.length > 0
    ? `
Brand Voice Examples:
${companyContext.companyContentTemplate.slice(0, 2).join("\n\n---\n\n")}
`
    : ""
}
${
  companyContext.companyProductBenefits?.length > 0
    ? `
Key Product Benefits: ${companyContext.companyProductBenefits.join(", ")}
`
    : ""
}
${
  companyContext.companyKeyDifferentiator
    ? `
Key Differentiator: ${companyContext.companyKeyDifferentiator}
`
    : ""
}

CRITICAL INSTRUCTIONS:
- You MUST generate the actual content, not describe what you're going to do
- Do NOT say things like "Let's get started" or "I'm ready to write"
- Generate the COMPLETE, FINAL content immediately
- Match the ${companyContext.companyVoiceTone} tone exactly
- Write for ${companyContext.targetAudienceTechnicalLevel} ${companyContext.targetAudienceJobTitle?.[0] || "professionals"}
- Include examples and insights relevant to ${companyContext.companyIndustry}
- Naturally incorporate the company's differentiators where appropriate.
- Ensure the content is returned in Markdown format.

You are currently in ${getModeLabel(mode)} mode.`;
}

export function generateUserPrompt(userInput: string, mode: string) {
  const formatInstructions = getFormatInstructions(mode);
  console.log(userInput, +"and User Mode is" + mode);
  return `USER REQUEST: ${userInput}

IMPORTANT: Generate the complete, final content NOW. Do not write meta-commentary about what you're going to do. Start directly with the content.

${formatInstructions}

Begin your response with the actual content immediately.`;
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

function getFormatInstructions(mode: string): string {
  switch (mode) {
    case "blog_writer":
      return `OUTPUT FORMAT:
# [SEO-Optimized Title]

**Meta Description:** [150-160 character description]

[Introduction paragraph - hook the reader]

## [First Main Section H2]
[Content with 2-3 short paragraphs]

## [Second Main Section H2]
[Content with 2-3 short paragraphs]

## [Third Main Section H2]
[Content with 2-3 short paragraphs]

## [Conclusion H2]
[Wrap-up paragraph with clear CTA]

Target: 1200-1500 words total`;

    case "product_update_writer":
      return `OUTPUT FORMAT:
# [Clear Update Headline]

**What's New:**
[2-3 sentences on what changed]

**Why It Matters:**
[2-3 sentences on benefits to users]

**How to Use It:**
[Step-by-step instructions or where to find it]

**What You Need to Do:**
[Any required actions, or "Nothing! It's live now."]

[Optional: Link to documentation]

Keep it 300-500 words total.`;

    case "landing_page_writer":
      return `OUTPUT FORMAT:

## HERO SECTION
**Headline:** [Benefit-driven, max 10 words]
**Subheadline:** [Clarify value, max 20 words]
**CTA Button:** [Action text]

## PROBLEM
[2-3 sentences addressing the pain point your audience faces]

## SOLUTION
[3-4 sentences on how your product solves it uniquely]

## KEY FEATURES
**[Feature 1 Name]:** [Benefit in one sentence]
**[Feature 2 Name]:** [Benefit in one sentence]
**[Feature 3 Name]:** [Benefit in one sentence]

## SOCIAL PROOF
[Suggestion: "Customer testimonial from [type of company] about [specific result]"]

## WHY CHOOSE US
[2-3 sentences emphasizing your key differentiator]

## FINAL CTA
**Headline:** [Action-oriented]
**CTA Button:** [Action text]`;

    case "email_writer":
      return `OUTPUT FORMAT:

**SUBJECT LINE OPTIONS:**
1. [40-50 chars - curiosity-driven]
2. [40-50 chars - benefit-focused]
3. [40-50 chars - urgency/FOMO]

**PREVIEW TEXT:** [80-100 chars that complements subject]

---

**EMAIL BODY:**

[Greeting]

[Hook sentence - grab attention immediately]

[2-3 short paragraphs delivering the main message]

[Clear CTA with link/button text]

[Friendly sign-off]
[Name/Team]

P.S. [Optional reinforcement or secondary point]

---

Keep body to 150-250 words.`;

    default:
      return "Generate the complete content based on the request.";
  }
}
