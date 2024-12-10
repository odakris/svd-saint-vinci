"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Student } from "@/types";
import { useState } from "react";
import Papa from "papaparse"; // CSV parser
import * as XLSX from "xlsx"; // XLSX parser
import { StudentFilters } from "../../../components/students/StudentsFilters";
import { StudentList } from "../../../components/students/StudentsList";

export default function ImportPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [file, setFile] = useState<File | null>(null); // Track the selected file

  // Handle the file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file in state
    }
  };

  // Function to parse CSV files
  const parseCSVFile = (fileContent: string) => {
    Papa.parse(fileContent, {
      complete: (result) => {
        console.log("Parsed CSV Result: ", result);
        const studentsData: Student[] = result.data as Student[]; // Adjust this to match your Student type
        setStudents(studentsData);
      },
      header: true, // If the CSV has headers
    });
  };

  // Function to parse XLS/XLSX files
  const parseXLSXFile = (fileContent: ArrayBuffer) => {
    const workbook = XLSX.read(fileContent, { type: "array" });
    const sheetNames = workbook.SheetNames;

    // Assuming you want to use the first sheet
    const firstSheet = workbook.Sheets[sheetNames[0]];
    console.log(firstSheet[0]);
    const studentsData: Student[] = XLSX.utils.sheet_to_json(firstSheet, {
      raw: false,
    }); // Converts the sheet to JSON
    setStudents(studentsData); // Update students state with parsed data
  };

  // Handle the "Import" button click to process the file
  const handleImportClick = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target?.result;
      if (!fileContent) return;
      console.log("fileContent :" + fileContent.valueOf());

      // Determine the file type by the extension
      const fileExtension = file?.name.split(".").pop()?.toLowerCase();

      if (fileExtension === "csv") {
        parseCSVFile(fileContent.toString()); // Parse as CSV
      } else if (fileExtension === "xls" || fileExtension === "xlsx") {
        parseXLSXFile(fileContent as ArrayBuffer); // Parse as XLSX
      } else {
        console.log("Unsupported file type");
      }
    };
    console.log("filename :" + file.name);

    reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer (for binary files like XLSX)
  };

  console.log(students);

  console.log(typeof students);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Import</h2>
        <div className="flex">
          {/* File input for selecting the file */}
          <Input
            type="file"
            className="w-[300px] mx-4"
            onChange={handleFileChange}
            accept=".csv,.xls,.xlsx" // Accept only CSV and XLSX files
          />
          {/* Import button to process the file */}
          <Button className="mx-4" onClick={handleImportClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>
      <div>
        {/* Display the imported students data */}
        {students && students.length > 0
          ? students.map((student, index) => (
              <div key={index} className="p-2 border rounded-md my-2">
                {student["Prénom"]} {student["Nom"]} - {student["Date de Naissance"]}
              </div>
            ))
          : "Aucune data importée"}
      </div>
    </div>
  );
}
