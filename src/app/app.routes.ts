import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register-user', component: RegisterUserComponent}
];
