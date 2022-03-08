import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(
    private empService: EmployeeService,
    private authService: AuthService
  ) {}
  display: boolean = false;
  username: string = '';
  password: string = '';
  displayNameForReg: string = '';
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
    if (!user.admin) {
      this.empService.deleteUser(user);
      console.log(user);
    } else {
      console.log('you can not delete admin user');
    }
  }

  showDialog(): void {
    this.display = true;
  }

  register(username: string, password: string, displayName: string) {
    this.authService.SignUp(username, password, displayName);
    this.username = '';
    this.password = '';
    this.displayNameForReg = '';
    this.display = false;
  }
}
