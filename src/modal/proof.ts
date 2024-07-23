import mongoose from "mongoose";

const proofSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      default: "default-profile-pic-url",
    },
    data: {
      type: String,
    },
    xp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Proof || mongoose.model("Proof", proofSchema);
