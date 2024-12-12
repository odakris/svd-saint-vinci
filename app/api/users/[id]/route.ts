import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/Users";
import ClassModel from "../../../../models/Classes";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération de l'utilisateur" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const data = await request.json();
    console.log(data);

    const teacherObj = await UserModel.findById(id);
    await ClassModel.findOneAndUpdate(
      { teacher: `${teacherObj.firstName} ${teacherObj.lastName}` },
      { $set: { teacher: `${data.firstName} ${data.lastName}` } }
    );

    // Check if this class has a teacher
    const isClassHasTeacher = await ClassModel.findOne({ level: data.class, teacher: { $ne: "" } });
    // If so remove the class assigned to the user
    if (isClassHasTeacher) {
      await UserModel.findOneAndUpdate({ class: data.class }, { $set: { class: "" } }, { new: true });
    }

    // Check if the teacher has a class
    const isCurrentTeacherHasClass = await UserModel.find({
      firstName: data.firstName,
      lastName: data.lastName,
      class: { $ne: "" },
    });
    if (isCurrentTeacherHasClass) {
      const classToRemove = await UserModel.findOne({ firstName: data.firstName, lastName: data.lastName });
      await ClassModel.findOneAndUpdate({ level: classToRemove.class }, { $set: { teacher: "" } }, { new: true });
      await UserModel.findOneAndUpdate(
        {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        {
          class: "",
        },
        { new: true }
      );
    }

    // Update Class for the specific User
    // const teacher = await UserModel.findByIdAndUpdate(id, data, { new: true });
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });

    // if (!teacher) {
    //   return NextResponse.json({ error: "Professeur non trouvé" }, { status: 404 });
    // }

    // Assign New class to the user
    await ClassModel.findOneAndUpdate(
      { level: data.class },
      { $set: { teacher: `${data.firstName} ${data.lastName}` } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération de l'utilisateur" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération de l'utilisateur" }, { status: 500 });
  }
}
