// backend/models/rightsModel.js
import mongoose from "mongoose";

const rightSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    sources: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Right", rightSchema);
