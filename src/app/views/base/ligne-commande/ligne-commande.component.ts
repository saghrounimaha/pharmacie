import { CommonModule } from '@angular/common';
import { LignesCommandesService } from './../../../services/lignes-commandes.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ligne-commande',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent,RouterLink],
  templateUrl: './ligne-commande.component.html',
  styleUrl: './ligne-commande.component.scss'
})
export class LigneCommandeComponent implements OnInit {
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedLigneCommandes: any[] = [];
  totalItems: number = 0; 
  isLoading: boolean = false;


  constructor(
    private activerouter: ActivatedRoute,
    private LigneCommandeService: LignesCommandesService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllLigneCommande();
  }

  getAllLigneCommande(): void {
    this.LigneCommandeService.getAllLigneCommande(this.currentPage, this.itemsPerPage).subscribe({
      next: (res: any) => {
        if (res && Array.isArray(res.data)) {
          this.paginatedLigneCommandes = res.data; // Assurez-vous d'utiliser les données paginées directement
          this.totalItems = res.totalCount; // Stocke le total des éléments pour la pagination
        } else {
          console.error('Format de réponse inattendu :', res);
          return;
        }
        console.log('LigneCommandes récupérées avec succès :', this.paginatedLigneCommandes);
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des LigneCommandes :', err);
        // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
      }
    });
  }
  deleteLigneCommande(id: number): void {
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
        this.LigneCommandeService.deleteLigneCommande(id).subscribe({
          next: (res: any) => {
            console.log('Ligne Commande deleted successfully:', res);
            Swal.fire({
              title: 'Deleted!',
              text: 'The Jour Livraisions has been deleted.',
              icon: 'success'
            });
            this.getAllLigneCommande();
          },
          error: (err: any) => {
            console.error('Error deleting Ligne Commande:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the Ligne Commande .',
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

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllLigneCommande(); // Re-fetch data for the new page
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.getAllLigneCommande(); // Re-fetch data for the new page
    }
  }

  getTotalPages(): number {
    return this.totalItems ? Math.ceil(this.totalItems / this.itemsPerPage) : 1;
  }
}
