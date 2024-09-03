import { CommonModule } from '@angular/common';
import { BonLivLGService } from './../../../services/bon-liv-lg.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bon-liv-lg',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './bon-liv-lg.component.html',
  styleUrl: './bon-liv-lg.component.scss'
})
export class BonLivLGComponent implements OnInit{
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedBON_LIV_LGs: any[] = [];
  BON_LIV_LGs: any[] = [];
  isLoading: boolean = false;

  constructor(
    private activerouter: ActivatedRoute,
    private BonLivLGService: BonLivLGService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllBON_LIV_LG();
  }

  getAllBON_LIV_LG(): void {
    this.BonLivLGService.getAllBON_LIV_LG().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.BON_LIV_LGs = res; 
        } else if (res && Array.isArray(res.data)) {
          this.BON_LIV_LGs = res.data;
        } else {
          console.error('Format de réponse inattendu:', res);
          return;
        }
        console.log('BON_LIV_LG récupérées avec succès:', this.BON_LIV_LGs);
        this.updateBON_LIV_LGs(); 
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des BON_LIV_LG:', err);
      }
    });
  }

  deleteBonLivLg(id: number): void {
    if (id == null || id === undefined) {
      console.error('ID is undefined or null');
      Swal.fire({
        title: 'Error!',
        text: 'Invalid ID.',
        icon: 'error'
      });
      return;
    }

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
        this.isLoading = true;
        this.BonLivLGService.deleteBON_LIV_LG(id).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "The item has been deleted.",
              icon: "success"
            });
            this.getAllBON_LIV_LG();
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
            this.isLoading = false;
          }
        });
      }
    });
  }

  updateBON_LIV_LGs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBON_LIV_LGs = this.BON_LIV_LGs.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateBON_LIV_LGs(); // Met à jour la liste des sections paginées
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateBON_LIV_LGs(); // Met à jour la liste des sections paginées
    }
  }

  getTotalPages(): number {
    return this.BON_LIV_LGs.length ? Math.ceil(this.BON_LIV_LGs.length / this.itemsPerPage) : 1;
  }
}
