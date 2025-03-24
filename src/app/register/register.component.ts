import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private http: HttpClient, private router: Router) { }

  user = {
    login: '',
    password: '',
    confirmPassword: ''
  };

  passwordMismatch: boolean = false;
  completedRegister: boolean = false;


  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    else {
      this.register();
    }
    this.passwordMismatch = false
  }

  register() {
    const url = 'http://localhost:8080/user/register';

    const body = {
      login: this.user.login,
      senha: this.user.password
    };

    this.http.post<any>(url, body).subscribe({
      next: (response) => {
        console.log('Resposta do login:', response);
        this.completedRegister = true;
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
      }
    });
  }

}
