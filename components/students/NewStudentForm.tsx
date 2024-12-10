"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

export default function NewStudentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    class: "",
    parentEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.class) {
      alert("Please fill out all required fields.");
      return;
    }

    const formatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate, // Utiliser la date telle quelle
      email: `${formData.firstName}.${formData.lastName}@ecole.fr`.toLowerCase(), // Générer un email basé sur prénom et nom
      parentEmail: formData.parentEmail ? formData.parentEmail : `parent.${formData.lastName}@email.com`.toLowerCase(), // Email parent par défaut
      class: formData.class, // Classe par défaut
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Student created successfully!");
        console.log("Created student:", result);
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: null,
          class: "",
          parentEmail: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to create student"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while creating the student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <Label htmlFor="birthDate">Date of Birth *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {formData.birthDate ? format(formData.birthDate, "dd/MM/yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={formData.birthDate || undefined}
                onSelect={(date: Date | undefined) => handleChange("birthDate", date)}
              />
            </PopoverContent>
          </Popover>
        </div>

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

        <div>
          <Label htmlFor="parentEmail">Parent Email</Label>
          <Input
            id="parentEmail"
            type="email"
            placeholder="Enter parent's email"
            value={formData.parentEmail}
            onChange={(e) => handleChange("parentEmail", e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Student"}
        </Button>
      </form>
    </div>
  );
}
