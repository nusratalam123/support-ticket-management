import mongoose from "mongoose";

const replyMsgSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    },
  {
    timestamps: true,
  },
);


const ReplyMsg = mongoose.model("ReplyMsg", replyMsgSchema);
export default ReplyMsg;
