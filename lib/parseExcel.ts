import XLSX from "xlsx";

interface ParsedStudent {
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
}

/**
 * Parses an Excel file and returns student data.
 * @param file - The uploaded file
 */
export async function parseExcel(file: Buffer): Promise<ParsedStudent[]> {
  const workbook = XLSX.read(file, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet).map((row: any) => ({
    firstname: row.firstname,
    lastname: row.lastname,
    dateOfBirth: new Date(row.dateOfBirth),
  }));
}
