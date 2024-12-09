export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  birthDate: string;
  email: string;
  parentEmail: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  teacherId: string;
  students: number;
  subjects: string[];
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  class?: string;
}

export enum Classes {
  "Petite Section" = 1,
  "Moyenne Section" = 2,
  "Grande Section" = 3,
  "CP" = 4,
  "CE1" = 5,
  "CE2" = 6,
  "CM1" = 7,
  "CM2" = 8,
}
