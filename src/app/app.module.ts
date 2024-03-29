import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
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

import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { AuthService } from './auth.service';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { UserManagementComponent } from './home/user-management/user-management.component';
import { LogsComponent } from './home/logs/logs.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { RegisterComponent } from './login/register/register.component';
import { UsersComponent } from './login/users/users.component';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,

    FooterComponent,
    MainComponent,

    ForgotPasswordComponent,
    SidebarComponent,
    UserManagementComponent,
    LogsComponent,
    VerifyEmailComponent,
    DashboardComponent,
    RegisterComponent,
    UsersComponent,
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
    InputNumberModule,
    AccordionModule,
    CheckboxModule,
    ConfirmDialogModule,
    TabViewModule,
    ReactiveFormsModule,
    PasswordModule,
    AvatarModule,
    Ng2SearchPipeModule,
    MessagesModule,
    MessageModule,
  ],
  providers: [AuthService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
