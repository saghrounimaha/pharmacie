import { CommandeService } from './../../../services/commande.service';
import { Component } from '@angular/core';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-collapses',
    templateUrl: './collapses.component.html',
    styleUrls: ['./collapses.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink  ]
})
export class CollapsesComponent {
  Commandes:any[]=[];
  page: number = 1;
  limit: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false;
  
  ngOnInit(): void {
    this.getAllCommandes();
    this.loadCommandes();
  }

  collapses = [false, false, false, false];

  constructor(private commandeService : CommandeService) { }

  toggleCollapse(id: number): void {
    // @ts-ignore
    this.collapses[id] = !this.collapses[id];
  }
  loadCommandes(): void {
    this.commandeService.getAllCommande(this.page, this.limit).subscribe(response => {
      this.Commandes = response.data;
      this.totalPages = Math.ceil(response.totalCount / this.limit); // Ajustez si votre réponse contient le total
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCommandes();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadCommandes();
    }
  }

  getAllCommandes(): void {
    this.commandeService.getAllCommande().subscribe({
      next: (res: any) => {
        this.Commandes = res;
        console.log('Commandes list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching Coammndes Role list:', err);
      }
    });
  }

  deleteCommande(id: number): void {
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
        this.commandeService.deleteCommande(id).subscribe({
          next: (res: any) => {
            console.log('Commande deleted successfully:', res);
            Swal.fire({
              title: 'Deleted!',
              text: 'The Commande has been deleted.',
              icon: 'success'
            });
            this.getAllCommandes();
          },
          error: (err: any) => {
            console.error('Error deleting commande:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the commande.',
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


}
