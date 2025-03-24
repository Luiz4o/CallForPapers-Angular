import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
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

  editCard(id: string) {
    this.router.navigate(['/edit', id]);

  }
}
