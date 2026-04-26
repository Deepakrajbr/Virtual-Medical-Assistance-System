import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is anemia?" }
      ],
    });

    console.log("✅ RESPONSE:");
    console.log(response.choices[0].message.content);

  } catch (err) {
    console.error("❌ ERROR:");
    console.error(err.message);
  }
}

test();