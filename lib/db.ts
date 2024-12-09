import mongoose from "mongoose";

let cached = global.mongoose as {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to MongoDB with a dynamic database name for the academic year.
 */
export async function connectToDatabase(scholarshipYear: string): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const dbName = `students_${scholarshipYear}`;
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, {
        dbName, // Database name dynamically based on scholarship year
      })
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Prevent TypeScript from treating this file as a script
export {};
