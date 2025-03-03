import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  subject: string;
  description: string;
  status: "Open" | "Resolved" | "Closed";
  customerId: mongoose.Schema.Types.ObjectId;
  executive: mongoose.Schema.Types.ObjectId | null;
}

const TicketSchema = new Schema<ITicket>({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Open", "Resolved", "Closed"], default: "Open" },
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  executive: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

export default mongoose.model<ITicket>("Ticket", TicketSchema);
