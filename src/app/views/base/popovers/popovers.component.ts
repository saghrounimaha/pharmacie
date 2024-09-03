import { StaticComponentService } from './../../../services/static-component.service';
import { Component, OnInit } from '@angular/core';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective } from '@coreui/angular';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-popovers',
    templateUrl: './popovers.component.html',
    styleUrls: ['./popovers.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class PopoversComponent implements OnInit {
  visible = true;
  submitted = false;
  id: number;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedStaticComponents: any[] = []; 
  StaticComponents: any[] = []; 

  constructor(
    private staticComponentService: StaticComponentService,
    private activerouter: ActivatedRoute
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = !this.visible;
    }, 3000);
    this.getAllStaticComponents();
  }

  getAllStaticComponents(): void {
    this.staticComponentService.getAllStaticComponents().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.StaticComponents = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.StaticComponents = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Unexpected response format:', res);
          return;
        }
        console.log('Static Components list fetched successfully:', this.StaticComponents);
        this.updatePaginatedStaticComponents(); // Met à jour la pagination après avoir récupéré les composants
      },
      error: (err: any) => {
        console.error('Error fetching Static Components list:', err);
      }
    });
  }

  updatePaginatedStaticComponents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStaticComponents = this.StaticComponents.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedStaticComponents(); // Met à jour la liste des composants paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedStaticComponents(); // Met à jour la liste des composants paginés
    }
  }

  getTotalPages(): number {
    return this.StaticComponents.length ? Math.ceil(this.StaticComponents.length / this.itemsPerPage) : 1;
  }
}