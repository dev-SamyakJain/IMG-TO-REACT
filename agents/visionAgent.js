// agents/visionAgent.js
const fs = require("fs");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function visionAgent(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the UI layout and components in this design wireframe image." },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBuffer.toString("base64")}` } }
        ]
      }
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = visionAgent;
