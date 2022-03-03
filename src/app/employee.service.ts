import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentData,
} from '@angular/fire/compat/firestore';
import { Employee } from './models/employee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private firestore: AngularFirestore) {}

  getUserDoc(id: string) {
    return this.firestore.collection('Employee').doc(id).valueChanges();
  }

  get() {
    return this.firestore.collection('Employee').snapshotChanges();
  }

  add(employee: Employee) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('Employee')
        .add(employee)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  delete(employee: Employee) {
    return this.firestore.collection('Employee').doc(employee.id).delete();
  }

  update(employee: Employee) {
    return this.firestore.collection('Employee').doc(employee.id).update({
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: employee.dateOfBirth,
      startWorkDate: employee.startWorkDate,
      endWorkDate: employee.endWorkDate,
      status: employee.status,
    });
  }
}
