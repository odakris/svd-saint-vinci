// /models/Student.ts
import mongoose, { Document, Schema } from "mongoose";

interface Student extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  class: string;
  academicYear: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema()<Student>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model<Student>("Student", StudentSchema);
