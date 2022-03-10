import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { User } from 'src/app/models/user';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private empService: EmployeeService
  ) {}
  items: MenuItem[] = [];
  email: string | null | undefined;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
  emailVerified: boolean | null | undefined;
  admin: boolean | null | undefined;
  users: User[] = [];
  user!: User;
  imageUrl: string = './admin.png';

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

  logout() {
    this.authService.signOut();
  }
}
