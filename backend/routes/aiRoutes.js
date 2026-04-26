// import express from "express";
// import OpenAI from "openai";

// const router = express.Router();

// // Initialize OpenAI Client
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // POST: /api/ai/chat
// router.post("/chat", async (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     return res.status(400).json({ reply: "Message is required" });
//   }

//   try {
//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini", 
//       messages: [
//         { role: "system", content: "You are a medical assistant. Provide helpful, safe replies." },
//         { role: "user", content: message }
//       ],
//     });

//     const aiReply = completion.choices[0].message.content;

//     res.json({ reply: aiReply });
//   } catch (error) {
//     console.error("AI Error:", error);
//     res.status(500).json({ reply: "AI server error, please try again." });
//   }
// });

// export default router;
