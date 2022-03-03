import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}
  username: string = '';
  password: string = '';

  ngOnInit(): void {}

  register(username: string, password: string) {
    this.authService.SignUp(username, password);
  }
}
