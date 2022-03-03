import { Report } from "./report";

export interface EmployeeReport {
    updateAt: any;
    month: number;
    reports: Report[];
}