import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private primengConfig: PrimeNGConfig
  ) {}
  username: string = '';
  password: string = '';
  

  ngOnInit(): void {}



  
  
}
