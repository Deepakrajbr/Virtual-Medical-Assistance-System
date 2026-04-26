import RagData from "../models/ragData.js";
import { getEmbedding, cosineSim } from "../utils/embeddings.js";

export const ragQuery = async (req, res) => {
  try {
    const { question, topK = 3 } = req.body;

    // 🔥 1. Detect intent
    const q = question.toLowerCase();

    let intent = "definition";

    if (q.includes("cause")) intent = "causes";
    else if (q.includes("symptom")) intent = "symptoms";
    else if (q.includes("treatment")) intent = "treatment";

    // 🔥 2. Convert question → embedding
    const queryEmbedding = getEmbedding(question);

    // 🔥 3. Fetch docs
    const docs = await RagData.find({
      embedding: { $exists: true, $ne: [] }
    }).lean();

    // 🔥 4. Score similarity
    const scored = docs.map(doc => ({
      ...doc,
      score: cosineSim(queryEmbedding, doc.embedding)
    }));

    // 🔥 5. Filter + sort
    const topDocs = scored
      .filter(d => d.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    // ❌ No result
    if (topDocs.length === 0) {
      return res.json({
        answer: "⚠️ No relevant information found."
      });
    }

    const best = topDocs[0];

    // 🔥 6. Prepare clean content
    const sentences = (best.content || "").split(".");
    const firstLine = sentences[0]?.trim() + ".";

    const extraPoints = sentences
      .slice(1, 4)
      .filter(s => s.trim().length > 10);

    // 🔥 7. Default AI-style answer
    let answer = `
🧠 AI Medical Assistant

📌 ${best.title}

Based on medical knowledge:

${firstLine}

💡 Key Points:
${extraPoints.map(s => "- " + s.trim()).join("\n")}
`;

    // 🔥 8. Intent-based override
    if (intent === "causes" && best.causes) {
      answer = `
🧠 AI Medical Assistant

📌 ${best.title}

Based on medical knowledge:

⚠️ Causes:
${best.causes}
`;
    } 
    else if (intent === "symptoms" && best.symptoms) {
      answer = `
🧠 AI Medical Assistant

📌 ${best.title}

Based on medical knowledge:

🔍 Symptoms:
${best.symptoms}
`;
    } 
    else if (intent === "treatment" && best.treatment) {
      answer = `
🧠 AI Medical Assistant

📌 ${best.title}

Based on medical knowledge:

💊 Treatment:
${best.treatment}
`;
    }

    // 🔥 9. Send response
    res.json({
      answer,
      source: best.title
    });

  } catch (err) {
    console.error("❌ RAG ERROR:", err);
    res.status(500).json({ message: "RAG Error" });
  }
};