import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}
  username: string = '';
  password: string = '';
  
  ngOnInit(): void {}

  login(username: string, password: string) {
    this.authService.SignIn(username, password);
    this.username = '';
    this.password = '';
    
  }
}
