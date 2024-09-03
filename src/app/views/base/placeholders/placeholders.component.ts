import { GroupecltsService } from './../../../services/groupeclts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective } from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-placeholders',
    templateUrl: './placeholders.component.html',
    styleUrls: ['./placeholders.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class PlaceholdersComponent implements OnInit {

  submitted = false;
  id: number;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedGroupesClts: any[] = []; // Vous pouvez remplacer 'any' par un type spécifique si possible

  GroupesClts: any[] = []; // Vous pouvez remplacer 'any' par un type spécifique si possible

  constructor(
    private groupecltService: GroupecltsService,
    private activerouter: ActivatedRoute
  ) {     
    this.id = this.activerouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllGroupes();
  }

  getAllGroupes(): void {
    this.groupecltService.getAllGroupesClts().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.GroupesClts = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.GroupesClts = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Unexpected response format:', res);
          return;
        }
        console.log('Groupes list fetched successfully:', this.GroupesClts);
        this.updatePaginatedGroupesClts(); // Met à jour la pagination après avoir récupéré les groupes
      },
      error: (err: any) => {
        console.error('Error fetching Groupes list:', err);
      }
    });
  }
  

  updatePaginatedGroupesClts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedGroupesClts = this.GroupesClts.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedGroupesClts(); // Met à jour la liste des groupes paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedGroupesClts(); // Met à jour la liste des groupes paginés
    }
  }

  getTotalPages(): number {
    return this.GroupesClts.length ? Math.ceil(this.GroupesClts.length / this.itemsPerPage) : 1;
  }
}