"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

export default function CreateStudentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    class: "",
    parentEmail: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  // Handle input change
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check for required fields
    if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.class) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Submitted data:", formData);
    alert("Student created successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <Label htmlFor="birthDate">Date of Birth *</Label>
          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {formData.birthDate ? format(formData.birthDate, "dd/MM/yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={formData.birthDate}
                onSelect={(date: any) => {
                  handleChange("birthDate", date);
                  setShowCalendar(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Class */}
        <div>
          <Label htmlFor="class">Class *</Label>
          <Select onValueChange={(value) => handleChange("class", value)} value={formData.class}>
            <SelectTrigger id="class">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6eme">6eme</SelectItem>
              <SelectItem value="5eme">5eme</SelectItem>
              <SelectItem value="4eme">4eme</SelectItem>
              <SelectItem value="3eme">3eme</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Parent Email (Optional) */}
        <div>
          <Label htmlFor="parentEmail">Parent Email</Label>
          <Input
            id="parentEmail"
            type="email"
            placeholder="Enter parent's email (optional)"
            value={formData.parentEmail}
            onChange={(e) => handleChange("parentEmail", e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Create Student
        </Button>
      </form>
    </div>
  );
}
