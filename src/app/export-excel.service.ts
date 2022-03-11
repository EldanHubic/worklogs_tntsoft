import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
 
  constructor(private empService: EmployeeService) {
    
  }

  generateExcel() {
    
  }
}
