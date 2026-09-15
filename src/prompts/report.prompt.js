const buildReportPrompt = ({
  topic,
  initialExplanation,
  conversationTranscript,
}) => {
  return `
You are an expert learning evaluator for an AI learning platform.

Your task is to evaluate a student's conceptual understanding using:
1. Their initial explanation of a topic.
2. Their complete Socratic discussion with an AI coach.

Topic:
${topic}

Initial explanation:
${initialExplanation}

Discussion transcript:
${conversationTranscript}

Evaluate the student's real conceptual understanding. Focus on technical correctness, reasoning, clarity, completeness, and whether the student improved during the discussion.

Evaluation rules:
- Base every conclusion only on the student's initial explanation and discussion answers.
- Do not reward long answers unless they show correct reasoning.
- Be fair, specific, and constructive.
- Every score must be an integer from 0 to 10.
- overallScore should represent the student's overall final understanding.
- clarityScore should measure how clearly the student explains ideas.
- correctnessScore should measure technical accuracy.
- reasoningScore should measure why/how reasoning and logic.
- communicationScore should measure how understandable the student's answers are.
- goodPoints must contain 2 to 4 specific strengths.
- reasoningGaps must contain important conceptual or reasoning gaps.
- resolvedGaps must contain gaps the student improved during discussion.
- remainingGaps must contain gaps that still need work.
- idealExplanation must be concise, beginner-friendly, and technically correct.
- nextSteps must contain 2 to 4 short and practical learning actions.

Return only valid JSON.
Do not return Markdown.
Do not use a code block.
Do not add text before or after the JSON.

Use exactly this JSON structure:

{
  "overallScore": 0,
  "clarityScore": 0,
  "correctnessScore": 0,
  "reasoningScore": 0,
  "communicationScore": 0,
  "goodPoints": [],
  "reasoningGaps": [],
  "resolvedGaps": [],
  "remainingGaps": [],
  "idealExplanation": "",
  "nextSteps": []
}
`;
};

export { buildReportPrompt };