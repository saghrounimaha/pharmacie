import { CommonModule } from '@angular/common';
import { TypeCommandesService } from './../../../services/type-commandes.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-type-commande',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './type-commande.component.html',
  styleUrl: './type-commande.component.scss'
})
export class TypeCommandeComponent implements OnInit {
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedTypeCommandes: any[] = [];
  TypeCommandes: any[] = []; // Pour stocker les éléments récupérés

  constructor(
    private activerouter: ActivatedRoute,
    private TypeCommandeService: TypeCommandesService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllTypeCommande();
  }

  getAllTypeCommande(): void {
    this.TypeCommandeService.getAllTypeCommande().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.TypeCommandes = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.TypeCommandes = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Format de réponse inattendu:', res);
          return;
        }
        console.log('TypeCommandes récupérées avec succès:', this.TypeCommandes);
        this.updateTypeCommandes(); // Met à jour la pagination après avoir récupéré les données
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des TypeCommandes:', err);
        // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
      }
    });
  }

  updateTypeCommandes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTypeCommandes = this.TypeCommandes.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTypeCommandes(); // Met à jour la liste des éléments paginés pour la nouvelle page
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateTypeCommandes(); // Met à jour la liste des éléments paginés pour la nouvelle page
    }
  }

  getTotalPages(): number {
    return this.TypeCommandes.length ? Math.ceil(this.TypeCommandes.length / this.itemsPerPage) : 1;
  }
}
