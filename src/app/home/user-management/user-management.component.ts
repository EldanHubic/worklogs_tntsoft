import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { EmployeeService } from 'src/app/employee.service';
import { ViewEncapsulation } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserManagementComponent implements OnInit {
  loading: boolean = false;
  display: boolean = false;
  private _search: string = '';
  value!: Date;
  selectStatus: string[] = ['ACTIVE', 'INACTIVE'];
  firstName: string = '';
  lastName: string = '';
  dateOfBirth: Date = new Date();
  startWorkDate: Date = new Date();
  endWorkDate: Date = new Date();
  a: Date = new Date(this.dateOfBirth);
  b: Date = new Date(this.startWorkDate);
  c: Date = new Date(this.endWorkDate);
  status: string = '';
  minDateValue!: Date;
  maxDateValue!: Date;
  private id!: string;
  public employeeForm!: FormGroup;
  public editEmployeeForm!: FormGroup;
  userRef: any;
  first = 0;
  rows = 10;
  editDisplay: boolean = false;
  successMsgs: any[] = [];
  

  employees: Employee[] = [];
  users: User[] = [];

  constructor(
    public empService: EmployeeService,
    public formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: new Date(),
      startWorkDate: new Date(),
      endWorkDate: new Date(),
      status: [''],
      dayReports: [],
    });
  }

  get search() {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
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
    this.empService.getUsers().subscribe((resp) => {
      this.users = resp.map((document) => {
        return {
          uid: document.payload.doc.id,
          ...(document.payload.doc.data() as {}),
        } as User;
      });
    });

    let today = new Date();
    this.maxDateValue = today;
  }

  addEmployeeSuccessMessage() {
    this.successMsgs = [
      {
        severity: 'success',
        summary: 'Success',
        detail: `Employee added!`,
      },
    ];
  }

  editEmployeeSuccessMessage(employee: Employee) {
    this.successMsgs = [
      {
        severity: 'success',
        summary: 'Success',
        detail: `Employee ${employee.firstName} ${employee.lastName} edited!`,
      },
    ];
  }

  deleteEmployeeSuccessMessage(employee: Employee) {
    this.successMsgs = [
      {
        severity: 'info',
        summary: 'Info',
        detail: `Employee ${employee.firstName} ${employee.lastName} deleted!`,
      },
    ];
  }

  addEmployee() {
    this.empService.add(this.employeeForm.value);
    this.employeeForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: this.dateOfBirth,
      startWorkDate: this.startWorkDate,
      endWorkDate: this.endWorkDate,
      status: [''],
      dayReports: [],
    });
    this.display = false;
    this.addEmployeeSuccessMessage();
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
    console.log(employee);

    this.empService.deleteEmployee(employee);
  }

  showDialog() {
    this.display = true;
  }

  confirm(employee: Employee) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteEmployee(employee);
        this.deleteEmployeeSuccessMessage(employee);
      },
    });
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
      dayReports: [],
    };

    this.empService.update(editedEmployee);
    this.firstName = '';
    this.lastName = '';
    this.dateOfBirth;
    this.startWorkDate;
    this.endWorkDate;
    this.status = '';
    this.editDisplay = false;
    this.editEmployeeSuccessMessage(editedEmployee);
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
}
