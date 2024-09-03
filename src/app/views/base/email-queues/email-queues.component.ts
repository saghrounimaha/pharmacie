import { CommonModule } from '@angular/common';
import { EmailQueuesService } from './../../../services/email-queues.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-queues',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './email-queues.component.html',
  styleUrl: './email-queues.component.scss'
})
export class EmailQueuesComponent {

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedEmailQueues: any[] = [];
    EmailQueues: any[] = [];
    isLoading: boolean = false;

  
    constructor(
      private activerouter: ActivatedRoute,
      private emailQueuesService: EmailQueuesService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllEmailQueues();
    }
  
    getAllEmailQueues(): void {
      this.emailQueuesService.getAllEmailQueues().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.EmailQueues = res; 
          } else if (res && Array.isArray(res.data)) {
            this.EmailQueues = res.data; 
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Email Queues récupérées avec succès:', this.EmailQueues);
          this.updateEmailQueues(); 
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Email Queues:', err);
        }
      });
    }

    deleteEmailQueues(id: number): void {
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
          this.emailQueuesService.deleteEmailQueue(id).subscribe({
            next: (res: any) => {
              console.log('Email Queues deleted successfully:', res);
              Swal.fire({
                title: 'Deleted!',
                text: 'The Email Queues has been deleted.',
                icon: 'success'
              });
              this.getAllEmailQueues();
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
  
    updateEmailQueues(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedEmailQueues = this.EmailQueues.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateEmailQueues(); 
      }
    }
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateEmailQueues(); 
      }
    }
  
    getTotalPages(): number {
      return this.EmailQueues.length ? Math.ceil(this.EmailQueues.length / this.itemsPerPage) : 1;
    }
  }

