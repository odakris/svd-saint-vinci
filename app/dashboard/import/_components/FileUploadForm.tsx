// /app/dashboard/import/components/FileUploadForm.tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Select component from Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FileUploadFormProps {
  onFileChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onYearChange: (value: string) => void;
  academicYear: string;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onFileChange, onSubmit, onYearChange, academicYear }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="academicYear" className="block text-lg font-medium">
          Select Academic Year:
        </label>
        <Select onValueChange={onYearChange} value={academicYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Academic Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            {/* Add more years as needed */}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="file" className="block text-lg font-medium">
          Upload Excel File:
        </label>
        <Input
          type="file"
          accept=".xls, .xlsx"
          onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)}
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full mt-4">
        Upload
      </Button>
    </form>
  );
};

export default FileUploadForm;
