import mongoose from "mongoose";

const executiveSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    },
  {
    timestamps: true,
  },
);


const Executive = mongoose.model("Executive", executiveSchema);
export default Executive;
