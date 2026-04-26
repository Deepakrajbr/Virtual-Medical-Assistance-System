import mongoose from "mongoose";

const ragSchema = new mongoose.Schema({
  title: String,
  definition: String,
  causes: String,
  symptoms: String,
  treatment: String,
  content: String,
  embedding: [String]
});

// ✅ FIX: prevent overwrite error
export default mongoose.models.RagData || mongoose.model("RagData", ragSchema);