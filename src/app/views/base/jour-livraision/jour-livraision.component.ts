import { JourLivraisionService } from './../../../services/jour-livraision.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jour-livraision',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './jour-livraision.component.html',
  styleUrl: './jour-livraision.component.scss'
})
export class JourLivraisionComponent implements OnInit{

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedJourLivraisions: any[] = [];
    JourLivraisions: any[] = [];
    isLoading: boolean = false;

  
    constructor(
      private activerouter: ActivatedRoute,
      private jourLivraisionService: JourLivraisionService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllJourLivraisions();
    }
  
    getAllJourLivraisions(): void {
      this.jourLivraisionService.getAllJourLivraisions().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.JourLivraisions = res; 
          } else if (res && Array.isArray(res.data)) {
            this.JourLivraisions = res.data; 
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Jour Livraisions récupérées avec succès:', this.JourLivraisions);
          this.updateJourLivraisions(); 
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Jour Livraisions:', err);
        }
      });
    }

    deleteJourLivraison(id: number): void {
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
          this.jourLivraisionService.deleteJourLivraision(id).subscribe({
            next: (res: any) => {
              console.log('Jour Livraisions deleted successfully:', res);
              Swal.fire({
                title: 'Deleted!',
                text: 'The Jour Livraisions has been deleted.',
                icon: 'success'
              });
              this.getAllJourLivraisions();
            },
            error: (err: any) => {
              console.error('Error deleting Jour Livraisions:', err);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the Jour Livraisions.',
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
  
  
    updateJourLivraisions(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedJourLivraisions = this.JourLivraisions.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateJourLivraisions(); 
      }
    }
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateJourLivraisions(); 
      }
    }
  
    getTotalPages(): number {
      return this.JourLivraisions.length ? Math.ceil(this.JourLivraisions.length / this.itemsPerPage) : 1;
    }
  }

