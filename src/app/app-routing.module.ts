import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogsComponent } from './home/logs/logs.component';
import { UserManagementComponent } from './home/user-management/user-management.component';
import { AuthGuard } from './login/auth.guard';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'user-management', component: UserManagementComponent },

      { path: 'logs', component: LogsComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
