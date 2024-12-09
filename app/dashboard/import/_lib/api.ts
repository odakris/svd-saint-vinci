// /app/dashboard/import/lib/api.ts

export const uploadStudentData = async (file: File, academicYear: string): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("academicYear", academicYear);

  try {
    const response = await fetch("/api/upload-students", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return data.message;
    } else {
      throw new Error(data.message || "An error occurred");
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to upload data");
  }
};
