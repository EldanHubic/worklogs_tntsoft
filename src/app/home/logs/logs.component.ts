import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/models/employee';
import * as FileSaver from 'file-saver';
import { DayReport } from 'src/app/models/dayReport';
import { validateCallback } from '@firebase/util';
import { DayReportsService } from 'src/app/day-reports.service';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  constructor(
    private empService: EmployeeService,
    private dayReportService: DayReportsService
  ) {}
  pickMonthYear: Date = new Date();

  startWork!: Date;
  endWork!: Date;
  break!: Date;
  currentMonthDays: number[] = new Array(this.daysInMonth(this.pickMonthYear));
  currentMonth: number = this.daysInMonth(this.pickMonthYear);
  employees: Employee[] = [];
  dayReports: DayReport[] = [];
  isSickDayChecked!: boolean;
  isVacationChecked!: boolean;
  isWorkDay!: boolean;
  ngOnInit(): void {
    this.empService.get().subscribe((resp) => {
      this.employees = resp.map((document) => {
        return {
          id: document.payload.doc.id,
          ...(document.payload.doc.data() as {}),
        } as Employee;
      });
    });
  }

  save(employee: Employee) {
    let dayReport: DayReport = {
      date: this.pickMonthYear,
      sickDay: this.isSickDayChecked,
      vacation: this.isVacationChecked,
      workStart: this.startWork,
      workEnd: this.endWork,
      break: this.break,
      workDay: this.isWorkDay ? true : false,
      employee: employee,
    };

    console.log(dayReport);
  }

  daysInMonth(pickedMonth: any) {
    return new Date(
      pickedMonth.getFullYear(),
      pickedMonth.getMonth() + 1,
      0
    ).getDate();
  }

  
}
