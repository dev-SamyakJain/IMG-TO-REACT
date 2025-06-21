// agents/jsxGeneratorAgent.js
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function jsxGeneratorAgent(componentPlan) {
  const { components } = componentPlan;

  const results = {};

  for (const component of components) {
    const prompt = `
You are a React developer. Create a clean functional React component in JSX based on the following description.

Component Name: ${component.name}
Description: ${component.description}

Use Tailwind CSS for styling. Return only the component code.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }]
    });

    results[component.name] = completion.choices[0].message.content;
  }

  return results; // { Header: '...', Card: '...', etc. }
}

module.exports = jsxGeneratorAgent;
