import { CommonModule } from '@angular/common';
import { AnnoncesService } from './../../../services/annonces.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss'
})
export class AnnoncesComponent implements OnInit{
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedAnnonces: any[] = [];
    Annonces: any[] = [];
    isLoading: boolean = false;

  
    constructor(
      private activerouter: ActivatedRoute,
      private annonceService: AnnoncesService
    ) {
      // this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllAnnonces();
    }
  
    getAllAnnonces(): void {
      this.annonceService.getAllAnnonces().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.Annonces = res; 
          } else if (res && Array.isArray(res.data)) {
            this.Annonces = res.data; 
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Annonce récupérées avec succès:', this.Annonces);
          this.updateAnnonces(); 
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Annonce:', err);
        }
      });
    }


    deleteAnnonce(id: number): void {
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
          this.isLoading = true; // Afficher l'indicateur de chargement
    
          this.annonceService.deleteAnnonces(id).subscribe({
            next: (res: any) => {
              console.log('Annonce deleted successfully:', res);
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
              });
              this.getAllAnnonces(); // Recharger la liste des annonces
            },
            error: (err: any) => {
              console.error('Error deleting annonce:', err);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete annonce.',
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
    
    updateAnnonces(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedAnnonces = this.Annonces.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateAnnonces(); // Met à jour la liste des sections paginées
      }
    }
  
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateAnnonces(); // Met à jour la liste des sections paginées
      }
    }
  
    getTotalPages(): number {
      return this.Annonces.length ? Math.ceil(this.Annonces.length / this.itemsPerPage) : 1;

    }
  }

