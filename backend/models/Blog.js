import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);