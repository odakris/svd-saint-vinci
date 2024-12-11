import mongoose, { Document, Schema } from "mongoose";
import * as bcrypt from "bcrypt";

// Interface pour typer un document User
interface IUser extends Document {
  email: string;
  password: string;
  birthDate: string;
  firstName: string;
  lastName: string;
  role: "Admin" | "Professeur";
  class: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    },
    birthDate: {
      type: String,
      required: [true, "La date de naissance est requise"],
    },
    firstName: {
      type: String,
      required: [true, "Le prénom est requis"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Professeur"],
      required: [true, "Le rôle est requis"],
    },
    class: {
      type: String,
      // required: function () {
      //   return this.role === "teacher";
      // }, // `this` fait référence au document
    },
  },
  {
    timestamps: true,
  }
);

// Middleware pour hasher le mot de passe avant l'enregistrement
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Méthode d'instance pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Création et exportation du modèle User
const UserModel = mongoose.models.UserUser || mongoose.model("User", UserSchema);

export default UserModel;
