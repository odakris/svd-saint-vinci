import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  class?: string; // Nullable field for class assignment
}

const StudentSchema: Schema<IStudent> = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    class: { type: String, default: null },
  },
  { timestamps: true }
);

export const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
