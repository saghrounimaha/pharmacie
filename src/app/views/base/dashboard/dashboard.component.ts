import { DashboardService } from './../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedDashboards: any[] = [];
    Dashboards: any[] = [];
    isLoading: boolean = false;

  
    constructor(
      private activerouter: ActivatedRoute,
      private dashboardService: DashboardService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllDashboard();
    }
  
    getAllDashboard(): void {
      this.dashboardService.getAllDashboard().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.Dashboards = res; // Si la réponse est déjà un tableau
          } else if (res && Array.isArray(res.data)) {
            this.Dashboards = res.data; // Si la réponse est un objet avec un tableau dans 'data'
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Dashboards récupérées avec succès:', this.Dashboards);
          this.updateDashboards(); // Met à jour la pagination après avoir récupéré les sections
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Dashboards:', err);
          // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
        }
      });
    }

    deleteDashboard(id: number): void {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.dashboardService.deleteDashboard(id).subscribe({
            next: (res: any) => {
              console.log('dashboard deleted successfully:', res);
              Swal.fire({
                title: 'Deleted!',
                text: 'The dashboard has been deleted.',
                icon: 'success'
              });
              this.getAllDashboard();
            },
            error: (err: any) => {
              console.error('Error deleting dashboard:', err);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the dashboard.',
                icon: 'error'
              });
            },
            complete: () => {
              this.isLoading = false; // Assurez-vous que le loading est désactivé dans le bloc complete
            }
          });
        }
      });
    }
  
    updateDashboards(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedDashboards = this.Dashboards.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateDashboards(); // Met à jour la liste des sections paginées
      }
    }
  
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateDashboards(); // Met à jour la liste des sections paginées
      }
    }
  
    getTotalPages(): number {
      return this.Dashboards.length ? Math.ceil(this.Dashboards.length / this.itemsPerPage) : 1;
    }
  }
