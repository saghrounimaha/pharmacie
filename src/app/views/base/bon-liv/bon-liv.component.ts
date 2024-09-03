import { CommonModule } from '@angular/common';
import { BonLivService } from './../../../services/bon-liv.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RoundedDirective, RowComponent, TabDirective, TableDirective, TabPanelComponent, TabsComponent } from '@coreui/angular';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bon-liv',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './bon-liv.component.html',
  styleUrl: './bon-liv.component.scss'
})
  export class BonLivComponent implements OnInit {
      id: number;
      submitted = false;
      currentPage: number = 1;
      itemsPerPage: number = 6;
      paginatedBON_LIV: any[] = [];
      BON_LIVs: any[] = [];
      isLoading: boolean = false;
    
      constructor(
        private activerouter: ActivatedRoute,
        private BonLivService: BonLivService
      ) {
        this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
      }
    
      ngOnInit(): void {
        this.getAllBON_LIV();
      }
    
      getAllBON_LIV(): void {
        this.BonLivService.getAllBON_LIV().subscribe({
          next: (res: any) => {
            if (Array.isArray(res)) {
              this.BON_LIVs = res;
            } else if (res && Array.isArray(res.data)) {
              this.BON_LIVs = res.data;
            } else {
              console.error('Format de réponse inattendu:', res);
              return;
            }
            console.log('BON_LIV récupérées avec succès:', this.BON_LIVs);
            this.updateBON_LIV();
          },
          error: (err: any) => {
            console.error('Erreur lors de la récupération des BON_LIV:', err);
          }
        });
      }
    
      deleteBonLiv(id: number): void {
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
    
            this.BonLivService.deleteBON_LIV(id).subscribe({
              next: (res: any) => {
                console.log(res);
                Swal.fire({
                  title: "Deleted!",
                  text: "The item has been deleted.",
                  icon: "success"
                });
                this.getAllBON_LIV();
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
    
      updateBON_LIV(): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedBON_LIV = this.BON_LIVs.slice(startIndex, endIndex);
      }
    
      goToPreviousPage(): void {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.updateBON_LIV();
        }
      }
    
      goToNextPage(): void {
        if (this.currentPage < this.getTotalPages()) {
          this.currentPage++;
          this.updateBON_LIV();
        }
      }
    
      getTotalPages(): number {
        return this.BON_LIVs.length ? Math.ceil(this.BON_LIVs.length / this.itemsPerPage) : 1;
      }
    }
    