import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/models/employee';
import * as XLSX from 'xlsx';

import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isWeekend,
  startOfMonth,
} from 'date-fns';

import { DayReport } from 'src/app/models/dayReport';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  constructor(private empService: EmployeeService) {}
  workStart: string = '';
  workEnd: string = '';
  breakStart: string = '';
  breakEnd: string = '';
  isWorkDay!: boolean;
  isVacation!: boolean;
  isSickDay!: boolean;
  weekDayName: string = '';
  pickMonthYear: Date = new Date();
  today = new Date();
  dayReports: DayReport[] = [];
  employees: Employee[] = [];
  nizZastavica: boolean[] = [];
  interval: Date[] = [];
  tableForExcel: boolean = false;
  fileName: string = 'employeeTable.xlsx';

  ngOnInit(): void {
    //lista svih employeea koji se spremaju u niz
    this.empService.get().subscribe((resp) => {
      this.employees = resp.map((document) => {
        return {
          id: document.payload.doc.id,
          ...(document.payload.doc.data() as {}),
        } as Employee;
      });
      console.log(this.employees.length);

      this.generateDaysInMonth(this.pickMonthYear);
      
    });
  }

  onSubmit() {}

  generateDaysInMonth(pickedMonth: Date) {
    this.interval = eachDayOfInterval({
      start: startOfMonth(pickedMonth),
      end: endOfMonth(pickedMonth),
    });

    this.employees.forEach((employee) => {
      employee.dayReports = [];
      this.interval.forEach((day) => {
        let defaultDayReport: DayReport = {
          date: format(day, 'dd.MM.yyyy'),
          sickDay: false,
          vacation: false,
          workStart: '07:00',
          workEnd: '15:00',
          breakStart: '12:00',
          breakEnd: '13:00',
          workDay: !isWeekend(day),
          employeeID: employee.id,
        };

        employee.dayReports.push(defaultDayReport);
      });
      console.log(employee);
    });

    this.interval.forEach((day) => {
      this.getWeekDayName(day);
    });
  }

  getWeekDayName(day: Date) {
    let name = getDay(day);
    let dayName: string = '';
    switch (name + 1) {
      case 1: {
        dayName = 'Sunday';
        break;
      }
      case 2: {
        dayName = 'Monday';
        break;
      }
      case 3: {
        dayName = 'Tuesday';
        break;
      }
      case 4: {
        dayName = 'Wednesday';
        break;
      }
      case 5: {
        dayName = 'Thursday';
        break;
      }
      case 6: {
        dayName = 'Friday';
        break;
      }
      case 7: {
        dayName = 'Saturday ';
        break;
      }
      default:
        break;
    }

    return dayName;
  }

  changeInput(dayReports: DayReport[]) {
    console.log(dayReports);
  }

  saveDayReports(employee: Employee) {
    console.log(employee);
  }

  exportExcelTable() {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    this.employees.forEach((employee) => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employee.dayReports);
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        employee.firstName + ' ' + employee.lastName
      );
    });

    XLSX.writeFile(wb, this.fileName);
  }
}
