import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { EmployeeService } from 'src/app/employee.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private empService: EmployeeService) {}

  email: string | null | undefined;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
  emailVerified: boolean | null | undefined;
  admin: boolean | null | undefined;
  users: User[] = [];
  user!: User;

  ngOnInit(): void {
    const auth = getAuth();

    this.empService.getUsers().subscribe((resp) => {
      this.users = resp.map((document) => {
        return {
          uid: document.payload.doc.id,
          ...(document.payload.doc.data() as {}),
        } as User;
      });
      onAuthStateChanged(auth, (user) => {
        this.users.forEach((element) => {
          if (element.uid === user?.uid) {
            this.email = element.email;
            this.displayName = element.displayName;
            this.photoURL = element.photoURL;
            this.emailVerified = element.emailVerified;
            this.admin = element.admin;
          }
        });
      });
    });
  }

deleteUser(user: User) {
  this.empService.delete(user);
}

}
