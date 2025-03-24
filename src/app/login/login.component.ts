import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,          // ✅ Necessário para *ngIf, *ngFor, etc.
    RouterLink,            // Se você estiver usando <a routerLink="">
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) { }

  user: string = ""
  password: string = ""

  login() {
    const url = 'http://localhost:8080/user/login';

    const body = {
      login: this.user,
      senha: this.password
    };

    this.http.post<any>(url, body).subscribe({
      next: (response) => {
        console.log('Resposta do login:', response);

        const token = response.tokenJWT;

        if (token) {
          localStorage.setItem('token', token);
          console.log('Token salvo com sucesso!');
          this.router.navigate(['/home'])
        } else {
          console.warn('Token não retornado na resposta.');
        }
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        console.error(this.user)
        console.error(this.password)

      }
    });
  }

}
