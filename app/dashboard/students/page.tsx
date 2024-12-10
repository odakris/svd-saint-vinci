"use client";

import { useState } from "react";
import { StudentList } from "@/components/students/StudentsList";
import { StudentFilters } from "@/components/students/StudentsFilters";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between"></div>
      <StudentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      />
      <StudentList searchQuery={searchQuery} selectedClass={selectedClass} />
    </div>
  );
}
