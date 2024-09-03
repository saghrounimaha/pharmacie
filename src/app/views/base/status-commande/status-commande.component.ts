import { StatusCommandesService } from './../../../services/status-commandes.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-status-commande',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './status-commande.component.html',
  styleUrl: './status-commande.component.scss'
})
export class StatusCommandeComponent implements OnInit{
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedStatusCommandes: any[] = [];
  StatusCommandes: any[] = [];

  constructor(
    private activerouter: ActivatedRoute,
    private statusCommandeService: StatusCommandesService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllStatusCommande();
  }

  getAllStatusCommande(): void {
    this.statusCommandeService.getAllStatusCommande().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.StatusCommandes = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.StatusCommandes = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Format de réponse inattendu:', res);
          return;
        }
        console.log('StatusCommandes récupérées avec succès:', this.StatusCommandes);
        this.updateStatusCommandes(); // Met à jour la pagination après avoir récupéré les données
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des StatusCommandes:', err);
        // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
      }
    });
  }

  updateStatusCommandes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStatusCommandes = this.StatusCommandes.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateStatusCommandes(); // Met à jour la liste des éléments paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateStatusCommandes(); // Met à jour la liste des éléments paginés
    }
  }

  getTotalPages(): number {
    return this.StatusCommandes.length ? Math.ceil(this.StatusCommandes.length / this.itemsPerPage) : 1;
  }
}