const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function componentPlannerAgent(layoutDescription) {
  const prompt = `
You are a React UI architect. Given the following layout description of a web page, identify reusable components and their roles. 
Return a JSON object with component names and their descriptions, and nothing else.

Layout:
${layoutDescription}

Respond ONLY with valid JSON. No markdown or explanation.
Example:
{
  "components": [
    {
      "name": "Header",
      "description": "Top bar with logo and navigation"
    }
  ]
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }]
  });

  let responseText = completion.choices[0].message.content.trim();

  // 🧹 Strip markdown if present
  if (responseText.startsWith("```json")) {
    responseText = responseText.replace(/```json/, "").replace(/```/, "").trim();
  } else if (responseText.startsWith("```")) {
    responseText = responseText.replace(/```/, "").replace(/```/, "").trim();
  }

  return JSON.parse(responseText);
}

module.exports = componentPlannerAgent;
