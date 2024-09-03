import { StatusCmdsService } from './../../../services/status-cmds.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-status-cmds',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './status-cmds.component.html',
  styleUrl: './status-cmds.component.scss'
})
export class StatusCmdsComponent {
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedStatusCmds: any[] = [];
  StatusCmds: any[] = [];

  constructor(
    private activerouter: ActivatedRoute,
    private statusCmdsService: StatusCmdsService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllStatusCmds();
  }

  getAllStatusCmds(): void {
    this.statusCmdsService.getAllStatusCmds().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.StatusCmds = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.StatusCmds = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Format de réponse inattendu:', res);
          return;
        }
        console.log('Status Cmds récupérées avec succès:', this.StatusCmds);
        this.updateStatusCmds(); // Met à jour la pagination après avoir récupéré les données
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des Status Cmds:', err);
        // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
      }
    });
  }

  updateStatusCmds(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStatusCmds = this.StatusCmds.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateStatusCmds(); // Met à jour la liste des éléments paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateStatusCmds(); // Met à jour la liste des éléments paginés
    }
  }

  getTotalPages(): number {
    return this.StatusCmds.length ? Math.ceil(this.StatusCmds.length / this.itemsPerPage) : 1;
  }
}