import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  display: boolean = false;
  value!: Date;
  
  firstName: string = '';
  lastName: string = '';
  dateOfBirth!: Date;
  startWorkDate!: Date;
  endWorkDate!: Date | null;
  status: string = '';

  private id!: string;
  public employeeForm!: FormGroup;
  public editEmployeeForm!: FormGroup;
  userRef: any;
  first = 0;
  rows = 10;
  editDisplay: boolean = false;

  employees: Employee[] = [];

  constructor(
    private empService: EmployeeService,
    public formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      startWorkDate: [''],
      endWorkDate: [''],
      status: [''],
    });
  }

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

  addEmployee() {
    this.empService.add(this.employeeForm.value);
    this.employeeForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      startWorkDate: [''],
      endWorkDate: [''],
      status: [''],
    });
    this.display = false;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.employees
      ? this.first === this.employees.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.employees ? this.first === 0 : true;
  }

  deleteEmployee(employee: Employee) {
    this.empService.delete(employee);
  }

  showDialog() {
    this.display = true;
  }

  showEditDialog(employee: Employee) {
    console.log(employee);
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.dateOfBirth = employee.dateOfBirth;
    this.startWorkDate = employee.startWorkDate;
    this.endWorkDate = employee.endWorkDate;
    this.status = employee.status;
    this.editDisplay = true;
  }

  updateEmployee() {
    let editedEmployee: Employee = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      startWorkDate: this.startWorkDate,
      endWorkDate: this.endWorkDate,
      status: this.status,
    };

    this.empService.update(editedEmployee);
    this.firstName = '';
    this.lastName = '';
    this.dateOfBirth;
    this.startWorkDate;
    this.endWorkDate;
    this.status = '';
    this.editDisplay = false;
  }
}
