import { SettingsService } from './../../../services/settings.service';
import { Component } from '@angular/core';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective} from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class ProgressComponent {
  value = 10;
  variant: 'striped' | undefined;
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedSettings: any[] = []; // Remplacez 'any' par le type approprié si disponible
  Settings: any[] = []; // Remplacez 'any' par le type approprié si disponible

  constructor(
    private activerouter: ActivatedRoute,
    private settingService: SettingsService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre

    setTimeout(() => {
      this.value = 100;
      this.variant = 'striped';
    }, 3000);
  }

  ngOnInit(): void {
    this.getAllSettings();
  }

  getAllSettings(): void {
    this.settingService.getAllSettings().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.Settings = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.Settings = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Unexpected response format:', res);
          return;
        }
        console.log('Settings list fetched successfully:', this.Settings);
        this.updatePaginatedSettings(); // Met à jour la pagination après avoir récupéré les paramètres
      },
      error: (err: any) => {
        console.error('Error fetching Settings list:', err);
      }
    });
  }

  updatePaginatedSettings(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSettings = this.Settings.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedSettings(); // Met à jour la liste des paramètres paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedSettings(); // Met à jour la liste des paramètres paginés
    }
  }

  getTotalPages(): number {
    return this.Settings.length ? Math.ceil(this.Settings.length / this.itemsPerPage) : 1;
  }
}