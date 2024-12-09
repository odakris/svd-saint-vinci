// pages/api/upload-students.ts
import multer from "multer";
import nextConnect from "next-connect";
import xlsx from "xlsx";
import mongoose from "mongoose";
import Student from "../../models/Student";
import AcademicYear from "../../models/AcademicYear";

const upload = multer({ dest: "uploads/" }); // Set up multer to handle the file upload

const handler = nextConnect();

handler.use(upload.single("file")); // Handle the file upload as a single file

handler.post(async (req, res) => {
  const { academicYear } = req.body;
  const file = req.file;

  // Validate academic year
  const yearData = await AcademicYear.findOne({ year: academicYear });
  if (!yearData) {
    return res.status(400).json({ message: "Academic year not found." });
  }

  try {
    // Read and parse the Excel file
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Insert students data
    const students = data.map((student: any) => ({
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: new Date(student.dateOfBirth),
      academicYear: yearData._id, // Assign academic year
    }));

    await Student.insertMany(students); // Bulk insert students into MongoDB

    res.status(200).json({ message: "Students data uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error importing students data." });
  }
});

export default handler;
