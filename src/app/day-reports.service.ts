import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DayReport } from './models/dayReport';

@Injectable({
  providedIn: 'root',
})
export class DayReportsService {
  constructor(private firestore: AngularFirestore) {}

  get() {
    return this.firestore.collection('DayReport').snapshotChanges();
  }

  add(dayReport: DayReport) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('DayReport')
        .add(dayReport)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }
}
