import { CommonModule } from '@angular/common';
import { CalendrierService } from './../../../services/calendrier.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent implements OnInit{

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedCalendriers: any[] = [];
    Calendriers: any[] = [];
    isLoading: boolean = false;

  
    constructor(
      private activerouter: ActivatedRoute,
      private calendrierService: CalendrierService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllCalendriers();
    }
  
    getAllCalendriers(): void {
      this.calendrierService.getAllCalendriers().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.Calendriers = res; 
          } else if (res && Array.isArray(res.data)) {
            this.Calendriers = res.data; 
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Calendriers récupérées avec succès:', this.Calendriers);
          this.updateCalendriers(); 
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Calendriers:', err);
        }
      });
    }

    deleteCalendrier(id: number): void {
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
    
          this.calendrierService.deleteCalendrier(id).subscribe({
            next: (res: any) => {
              console.log('Calendrier deleted successfully:', res);
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
              });
              this.getAllCalendriers(); // Recharger la liste des dépôts après suppression
            },
            error: (err: any) => {
              console.error('Error deleting Calendrier:', err);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete Calendrier.',
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
    
    updateCalendriers(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedCalendriers = this.Calendriers.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateCalendriers(); 
      }
    }
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateCalendriers(); 
      }
    }
  
    getTotalPages(): number {
      return this.Calendriers.length ? Math.ceil(this.Calendriers.length / this.itemsPerPage) : 1;
    }
  }

