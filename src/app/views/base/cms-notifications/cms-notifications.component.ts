import { CmsNotificationsService } from './../../../services/cms-notifications.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cms-notifications',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './cms-notifications.component.html',
  styleUrl: './cms-notifications.component.scss'
})
export class CmsNotificationsComponent {

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedCmsNotifications: any[] = [];
    CmsNotifications: any[] = [];
    isLoading: boolean = false;
  
    constructor(
      private activerouter: ActivatedRoute,
      private cmsNotificationsService: CmsNotificationsService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllCmsNotifications();
    }
  
    getAllCmsNotifications(): void {
      this.cmsNotificationsService.getAllCmsNotifications().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.CmsNotifications = res; // Si la réponse est déjà un tableau
          } else if (res && Array.isArray(res.data)) {
            this.CmsNotifications = res.data; // Si la réponse est un objet avec un tableau dans 'data'
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('CMS Notification récupérées avec succès:', this.CmsNotifications);
          this.updateCmsNotifications(); // Met à jour la pagination après avoir récupéré les sections
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des CMS Notification:', err);
          // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
        }
      });
    }

    
    deleteCmsNotifications(id: number): void {
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
          this.cmsNotificationsService.deleteCmsNotification(id).subscribe({
            next: (res: any) => {
              console.log('Notification deleted successfully:', res);
              Swal.fire({
                title: 'Deleted!',
                text: 'The notification has been deleted.',
                icon: 'success'
              });
              this.getAllCmsNotifications();
            },
            error: (err: any) => {
              console.error('Error deleting notification:', err);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to delete the notification.',
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
  
  
  
    updateCmsNotifications(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedCmsNotifications = this.CmsNotifications.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateCmsNotifications(); // Met à jour la liste des sections paginées
      }
    }
  
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateCmsNotifications(); // Met à jour la liste des sections paginées
      }
    }
  
    getTotalPages(): number {
      return this.CmsNotifications.length ? Math.ceil(this.CmsNotifications.length / this.itemsPerPage) : 1;
    }
  }

