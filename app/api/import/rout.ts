import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { parseExcel } from "@/lib/parseExcel";
import { Student } from "@/models/Student";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  const scholarshipYear = data.get("scholarshipYear") as string;

  if (!file || !scholarshipYear) {
    return NextResponse.json({ error: "Missing file or scholarship year" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();

  try {
    const students = await parseExcel(Buffer.from(buffer));
    await connectToDatabase(scholarshipYear);
    await Student.insertMany(students);

    return NextResponse.json({ message: "Students imported successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to import students" }, { status: 500 });
  }
}
