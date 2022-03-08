import { Employee } from "./employee";

export interface DayReport {
    date: Date;
    sickDay: boolean;
    vacation: boolean;
    workStart: any;
    workEnd: any;
    break: any;
    workDay: boolean;
    employee: Employee;
}