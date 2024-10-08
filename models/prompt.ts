import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt required"],
  },
  tag: {
    type: String,
    required: [true, "Tag required"],
  },
});

export const Prompt = models.Prompt || model("Prompt", PromptSchema);
