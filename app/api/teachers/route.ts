import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeacherModel from "@/models/Teacher";

export async function GET() {
  try {
    await connectDB();
    const teachers = await TeacherModel.find({}).sort({ lastName: 1 });
    return NextResponse.json(teachers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des professeurs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const teacher = await TeacherModel.create(data);
    console.log("teacher: " + teacher);
    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la création du professeur" }, { status: 500 });
  }
}
