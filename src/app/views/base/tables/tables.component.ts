import { ModeService } from './../../../services/mode.service';
import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class TablesComponent {
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedModePayement: any[] = []; // Remplacez 'any' par le type approprié si disponible
  ModePayements: any[] = []; // Remplacez 'any' par le type approprié si disponible
  
  constructor(
    private activerouter: ActivatedRoute,
    private modeService: ModeService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }
  
  ngOnInit(): void {
    this.getAllModePayement(); // Correction du nom de la méthode
  }
  
  getAllModePayement(): void { // Correction du nom de la méthode
    this.modeService.getAllModePayement().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.ModePayements = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.ModePayements = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Unexpected response format:', res);
          return;
        }
        console.log('Mode de paiement fetched successfully:', this.ModePayements);
        this.updateModePayement(); // Met à jour la pagination après avoir récupéré les paramètres
      },
      error: (err: any) => {
        console.error('Error fetching mode de paiement list:', err);
      }
    });
  }
  
  updateModePayement(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedModePayement = this.ModePayements.slice(startIndex, endIndex);
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateModePayement(); // Met à jour la liste des éléments paginés
    }
  }
  
  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateModePayement(); // Met à jour la liste des éléments paginés
    }
  }
  
  getTotalPages(): number {
    return this.ModePayements.length ? Math.ceil(this.ModePayements.length / this.itemsPerPage) : 1;
  }
}  