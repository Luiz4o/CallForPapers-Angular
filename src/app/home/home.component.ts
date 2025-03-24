import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

interface Card {
  id: number;
  title: string;
  summary: string;
  author: string;
  email: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  cards: Card[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarCards();
  }

  carregarCards() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado. Usuário não está autenticado.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `http://localhost:8080/propostas?page=` + (this.currentPage - 1);

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        this.cards = response.content.map((item: any) => ({
          id: item.id,
          title: item.title,
          summary: item.summary,
          author: item.author,
          email: item.email
        })); this.totalPages = response.totalPages;

      },
      error: (err) => {
        console.error('Erro ao carregar cards:', err);
      }
    });

  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.carregarCards();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.carregarCards();
    }
  }

}
