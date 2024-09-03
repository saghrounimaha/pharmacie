import { ParametreCommandeService } from './../../../services/parametre-commande.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-parametre-commande',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './parametre-commande.component.html',
  styleUrl: './parametre-commande.component.scss'
})
export class ParametreCommandeComponent implements OnInit{

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedParametreCommande: any[] = [];
    ParametreCommandes: any[] = [];

    constructor(
      private activerouter: ActivatedRoute,
      private parametreCommandeService: ParametreCommandeService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllParametreCommandes();
    }
  
    getAllParametreCommandes(): void {
      this.parametreCommandeService.getAllParametreCommandes().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.ParametreCommandes = res; // Si la réponse est déjà un tableau
          } else if (res && Array.isArray(res.data)) {
            this.ParametreCommandes = res.data; // Si la réponse est un objet avec un tableau dans 'data'
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Parametre Commande récupérées avec succès:', this.ParametreCommandes);
          this.updateParametreCommande(); // Met à jour la pagination après avoir récupéré les sections
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Parametre Commande:', err);
        }
      });
    }
  
    updateParametreCommande(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedParametreCommande = this.ParametreCommandes.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateParametreCommande(); 
      }
    }
  
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateParametreCommande(); 
      }
    }
  
    getTotalPages(): number {
      return this.ParametreCommandes.length ? Math.ceil(this.ParametreCommandes.length / this.itemsPerPage) : 1;
    }
  }

