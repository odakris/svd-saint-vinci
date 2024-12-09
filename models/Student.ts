import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Student document
interface Student extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  academicYear: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Student Schema
const StudentSchema = new Schema<Student>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Export the Student model
export default mongoose.models.Student || mongoose.model<Student>("Student", StudentSchema);
