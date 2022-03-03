export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startWorkDate: Date;
  endWorkDate: Date | null;
  status: string; 
}