export function getEmbedding(text) {
  const stopWords = ["what", "is", "the", "are", "how", "why", "of"];

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.includes(w));
}

// 🔥 stronger matching
export function cosineSim(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);

  let score = 0;

  for (let word of setA) {
    if (setB.has(word)) {
      score += 2; // boost
    }
  }

  return score;
}