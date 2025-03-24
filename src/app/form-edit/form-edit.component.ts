import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-form-edit',
  imports: [RouterLink, HeaderComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.css'
})
export class FormEditComponent {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  title: string = ""
  author: string = ""
  email: string = ""
  summary: string = ""
  id: string = ""

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.findProposal();
  }

  findProposal() {
    const url = 'http://localhost:8080/propostas/' + this.id;

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        this.title = response.title,
          this.author = response.author,
          this.email = response.email,
          this.summary = response.summary
      },
      error: (err) => {
        console.error('Erro ao carregar proposta:', err);
      }
    });
  }

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
      id: this.id,
      title: this.title,
      summary: this.summary,
      author: this.author,
      email: this.email,
    };

    this.http.put<any>(url, body, { headers }).subscribe({
      next: (response) => {
        console.log('Resposta do formulário:', response);

        this.router.navigate(['/edit', this.id])
      },
      error: (err) => {
        console.error('Erro ao enviar o formulário:', err);
      }
    });
  }
}
