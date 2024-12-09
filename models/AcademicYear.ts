// /models/AcademicYear.ts
import mongoose, { Document, Schema } from "mongoose";

interface AcademicYear extends Document {
  year: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AcademicYearSchema = new Schema<AcademicYear>(
  {
    year: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AcademicYear || mongoose.model<AcademicYear>("AcademicYear", AcademicYearSchema);
