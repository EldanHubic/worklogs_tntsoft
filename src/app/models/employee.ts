import { DayReport } from './dayReport';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startWorkDate: Date;
  endWorkDate: Date;
  status: string;
  dayReports: DayReport[];
}
