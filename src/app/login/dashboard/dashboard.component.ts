import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private empService: EmployeeService
  ) {}

  email: string | null | undefined;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
  emailVerified: boolean | null | undefined;
  admin!: boolean;
  users: User[] = [];
  user!: User;
  id!: string;
  uid!: string;
  imagePath: string = 'user.jpg';

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
          if (element.id === user?.uid) {
            this.email = element.email;
            this.displayName = element.displayName;
            this.photoURL = element.photoURL;
            this.emailVerified = element.emailVerified;
            this.admin = element.admin;
            this.id = element.id,
            this.uid = element.uid
          }
        });
      });
    });
  }

  changePicture(photoURL: string) {
    let user: User = {
      email: this.email,
      displayName: this.displayName,
      photoURL: photoURL,
      emailVerified: this.emailVerified,
      admin: this.admin,
      id: this.id,
      uid: this.uid
    }

    this.empService.updateUserPicture(user, photoURL)
  }
}
