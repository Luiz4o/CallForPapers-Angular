import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [HeaderComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  constructor(private http: HttpClient, private router: Router) { }

  title: string = ""
  author: string = ""
  email: string = ""
  summary: string = ""


  submit() {
    const url = 'http://localhost:8080/propostas';

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      title: this.title,
      summary: this.summary,
      author: this.author,
      email: this.email,
    };

    this.http.post<any>(url, body, { headers }).subscribe({
      next: (response) => {
        console.log('Resposta do formulário:', response);

        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.error('Erro ao enviar o formulário:', err);
      }
    });
  }
}
