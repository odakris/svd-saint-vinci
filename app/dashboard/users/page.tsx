"use client";

import { useState } from "react";
import { UsersList } from "@/components/users/UsersList";

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between"></div>
      <UsersList searchQuery={searchQuery} selectedClass={selectedClass} />
    </div>
  );
}
