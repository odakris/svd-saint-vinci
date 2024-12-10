import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeacherModel from "@/models/Teacher";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const teacher = await TeacherModel.findById(params.id);
    if (!teacher) {
      return NextResponse.json({ error: "Élève non trouvé" }, { status: 404 });
    }
    return NextResponse.json(teacher);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération de l'élève" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await request.json();
    const teacher = await TeacherModel.findByIdAndUpdate(params.id, data, { new: true });
    if (!teacher) {
      return NextResponse.json({ error: "Élève non trouvé" }, { status: 404 });
    }
    return NextResponse.json(teacher);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour de l'élève" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const teacher = await TeacherModel.findByIdAndDelete(params.id);
    if (!teacher) {
      return NextResponse.json({ error: "Élève non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Élève supprimé avec succès" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la suppression de l'élève" }, { status: 500 });
  }
}
