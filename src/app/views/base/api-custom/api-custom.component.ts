import { ActivatedRoute } from '@angular/router';
import { ApiCustomService } from './../../../services/api-custom.service';
import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-api-custom',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './api-custom.component.html',
  styleUrl: './api-custom.component.scss'
})
export class ApiCustomComponent {

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedApiCustom: any[] = [];
    ApiCustoms: any[] = [];
    isLoading: boolean = false;

  
    constructor(
      private activerouter: ActivatedRoute,
      private apiCustomService:ApiCustomService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllCmsApiCustoms();
    }
  
    getAllCmsApiCustoms(): void {
      this.apiCustomService.getAllCmsApiCustoms().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.ApiCustoms = res; 
          } else if (res && Array.isArray(res.data)) {
            this.ApiCustoms = res.data; 
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Api Custom récupérées avec succès:', this.ApiCustoms);
          this.updateApiCustom(); 
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Api Custom:', err);
        }
      });
    }

    deleteCustomer(id: number): void {
      // Afficher la confirmation avant la suppression
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true; // Afficher l'indicateur de chargement
    
          // Appeler le service pour supprimer l'élément
          this.apiCustomService.deleteCmsApiCustom(id).subscribe({
            next: (res: any) => {
              console.log(res);
              Swal.fire({
                title: "Deleted!",
                text: "The item has been deleted.",
                icon: "success"
              });
              this.getAllCmsApiCustoms(); // Recharger la liste après suppression
            },
            error: (err: any) => {
              console.error('Error deleting item:', err);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the item.',
                icon: 'error'
              });
            },
            complete: () => {
              this.isLoading = false; // Masquer l'indicateur de chargement
            }
          });
        }
      });
    }
    
    updateApiCustom(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedApiCustom = this.ApiCustoms.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateApiCustom(); // Met à jour la liste des sections paginées
      }
    }
  
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateApiCustom(); // Met à jour la liste des sections paginées
      }
    }
  
    getTotalPages(): number {
      return this.ApiCustoms.length ? Math.ceil(this.ApiCustoms.length / this.itemsPerPage) : 1;
    }
  }

