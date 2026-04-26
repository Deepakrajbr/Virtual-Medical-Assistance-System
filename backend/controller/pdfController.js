import RagData from "../models/RagData.js";
import { extractTextFromPDF, chunkText } from "../utils/pdfParser.js";
import { getEmbedding } from "../utils/embeddings.js";

export const uploadPDF = async (req, res) => {
  try {
    console.log("📥 PDF Upload Route Hit");
    console.log("File received:", req.file);
    if (!req.file) return res.status(400).json({ message: "No PDF uploaded" });

    const fileBuffer = req.file.buffer;

    // 1) extract text
    const fullText = await extractTextFromPDF(fileBuffer);

    if (!fullText || fullText.trim().length < 10) {
      return res.status(400).json({ message: "PDF contains no readable text" });
    }

    // 2) chunk the text
    const chunks = chunkText(fullText);

    let savedChunks = [];

    // 3) create embedding + save each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunkTextData = chunks[i];
      const vector = getEmbedding(chunkTextData);

      const newEntry = new RagData({
        title: `PDF Chunk ${i + 1}`,
        content: chunkTextData,
        embedding: vector
      });

      await newEntry.save();
      savedChunks.push(newEntry._id);
    }

    res.json({
      message: "PDF processed and added to knowledge base!",
      chunksAdded: savedChunks.length,
      chunkIds: savedChunks
    });

  } catch (err) {
    console.error("❌ PDF INGESTION ERROR:", err);
    res.status(500).json({
      message: "PDF ingestion failed",
      error: err.message,
    });
  }
};
