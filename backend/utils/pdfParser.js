import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

// 🔥 Extract + CLEAN text
export async function extractTextFromPDF(fileBuffer) {
  const data = await pdfParse(fileBuffer);

  let text = data.text;

  // ✅ CLEANING (VERY IMPORTANT)
  text = text
    .replace(/\n+/g, " ") // remove new lines
    .replace(/\s+/g, " ") // normalize spaces
    .replace(/the picture can't be displayed/gi, "") // remove junk
    .replace(/isp laye d/gi, "") // remove broken words
    .replace(/[^\x20-\x7E]/g, "") // remove weird characters
    .trim();

  return text;
}


// 🔥 BETTER CHUNKING (sentence-based)
export function chunkText(text, maxWords = 150) {
  const sentences = text.split(". ");
  const chunks = [];
  let currentChunk = "";

  for (let sentence of sentences) {
    const wordCount = (currentChunk + sentence).split(" ").length;

    if (wordCount < maxWords) {
      currentChunk += sentence + ". ";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + ". ";
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}