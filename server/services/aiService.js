import { Groq } from "groq-sdk/client.js";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY});

const systemPrompt = `You are an expert startup consultant. Analyze the given startup idea and return ONLY a valid JSON object with exactly these fields:
{
  "problem": "string — 2-3 sentence summary of the core problem",
  "customer": "string — description of the ideal customer persona",
  "market": "string — market size and opportunity overview",
  "competitor": [
    { "name": "CompetitorName", "differentiation": "one sentence on how they differ" }
  ],  
  "tech_stack": ["Tech1", "Tech2", "Tech3", "Tech4"],
  "risk_level": "Low" | "Medium" | "High",
  "profitability_score": <integer 0-100>,
  "justification": "string — 3-4 sentence reasoning for the score and risk"
}
Rules:
- competitor must have exactly 3 items
- tech_stack must have 4-6 items suited for an MVP
- profitability_score must be an integer between 0 and 100
- Return ONLY the JSON object. No markdown, no explanation, no backticks.`;

export async function analyzeIdea(title, description) {
  try {
    const userMessage = `Startup Idea Title: ${title}\nDescription: ${description}`;
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || '{}';
    
    // Safely extract the JSON object in case of conversational fluff or markdown
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : '{}';
    
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}
