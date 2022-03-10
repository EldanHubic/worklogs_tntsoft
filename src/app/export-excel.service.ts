import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  employees: Employee[] = [];
  constructor(private empService: EmployeeService) {
    this.empService.get().subscribe((resp) => {
      this.employees = resp.map((document) => {
        return {
          id: document.payload.doc.id,
          ...(document.payload.doc.data() as {}),
        } as Employee;
      });
    });
  }




  generateExcel() {
    const title = "Employee list";
    
  }
}
