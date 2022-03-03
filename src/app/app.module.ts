import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { FooterComponent } from './home/footer/footer.component';
import { MainComponent } from './home/main/main.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { AuthService } from './auth.service';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { UserManagementComponent } from './home/user-management/user-management.component';
import { LogsComponent } from './home/logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

    FooterComponent,
    MainComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    UserManagementComponent,
    LogsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    CalendarModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
