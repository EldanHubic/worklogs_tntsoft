import { DayReport } from './dayReport';

export interface Report {
    month: string;
    dayReports: DayReport[];
}