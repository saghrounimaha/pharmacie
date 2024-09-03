import { DepSectionsService } from './../../../services/dep-sections.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TooltipDirective, ButtonDirective, TableDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-tooltips',
    templateUrl: './tooltips.component.html',
    styleUrls: ['./tooltips.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class TooltipsComponent implements OnInit{
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedDepSections: any[] = [];
  DepSections: any[] = [];

  constructor(
    private activerouter: ActivatedRoute,
    private depSectionService: DepSectionsService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllSections();
  }

  getAllSections(): void {
    this.depSectionService.getAllDepSections().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.DepSections = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.DepSections = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Format de réponse inattendu:', res);
          return;
        }
        console.log('Sections récupérées avec succès:', this.DepSections);
        this.updateDepSections(); // Met à jour la pagination après avoir récupéré les sections
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des sections:', err);
      }
    });
  }

  updateDepSections(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDepSections = this.DepSections.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDepSections(); // Met à jour la liste des sections paginées
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateDepSections(); // Met à jour la liste des sections paginées
    }
  }

  getTotalPages(): number {
    return this.DepSections.length ? Math.ceil(this.DepSections.length / this.itemsPerPage) : 1;
  }
}