import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: FormEditComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];
