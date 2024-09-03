import { GroupeService } from './../../../services/groupe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective } from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-paginations',
    templateUrl: './paginations.component.html',
    styleUrls: ['./paginations.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class PaginationsComponent implements OnInit{
  submitted = false;
  id: number;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedGroupes: any[] = []; // Vous pouvez remplacer 'any' par un type spécifique si possible

  Groupes: any[] = []; // Vous pouvez remplacer 'any' par un type spécifique si possible

  constructor(
    private groupeService: GroupeService,
    private activerouter: ActivatedRoute
  ) {     
    this.id = this.activerouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllGroupes();
  }

  getAllGroupes(): void {
    this.groupeService.getAllGroupes().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.Groupes = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.Groupes = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Unexpected response format:', res);
          return;
        }
        console.log('Groupes list fetched successfully:', this.Groupes);
        this.updatePaginatedGroupes(); // Met à jour la pagination après avoir récupéré les groupes
      },
      error: (err: any) => {
        console.error('Error fetching Groupes list:', err);
      }
    });
  }
  

  updatePaginatedGroupes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedGroupes = this.Groupes.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedGroupes(); // Met à jour la liste des groupes paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedGroupes(); // Met à jour la liste des groupes paginés
    }
  }

  getTotalPages(): number {
    return this.Groupes.length ? Math.ceil(this.Groupes.length / this.itemsPerPage) : 1;
  }
}