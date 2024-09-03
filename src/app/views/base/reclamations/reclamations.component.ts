import { CommonModule } from '@angular/common';
import { ReclamationsService } from './../../../services/reclamations.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-reclamations',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './reclamations.component.html',
  styleUrl: './reclamations.component.scss'
})
export class ReclamationsComponent implements OnInit {
  id: number;
  submitted = false;
  currentPage = 1;
  itemsPerPage = 6;
  paginatedReclamations: any[] = [];
  reclamations: any[] = [];

  constructor(
    private activerouter: ActivatedRoute,
    private reclamationService: ReclamationsService 
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllReclamations();
  }

  getAllReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe({
      next: (res: any) => {
        this.reclamations = Array.isArray(res) 
          ? res 
          : res?.data ?? [];

        console.log('Reclamations récupérées avec succès:', this.reclamations);
        this.updateReclamations(); // Met à jour la pagination après avoir récupéré les données
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des Reclamations:', err);
        // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
      }
    });
  }

  updateReclamations(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReclamations = this.reclamations.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateReclamations(); // Met à jour la liste des éléments paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateReclamations(); // Met à jour la liste des éléments paginés
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.reclamations.length / this.itemsPerPage);
  }
}