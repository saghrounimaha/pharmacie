import { NotificationsFcmsService } from './../../../services/notifications-fcms.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-notifications-fcms',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './notifications-fcms.component.html',
  styleUrl: './notifications-fcms.component.scss'
})
export class NotificationsFcmsComponent implements OnInit{

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedNotificationsFcms: any[] = [];
    NotificationsFcms: any[] = [];
  
    constructor(
      private activerouter: ActivatedRoute,
      private notificationsFCMSService:NotificationsFcmsService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllNotificationsFcms();
    }
  
    getAllNotificationsFcms(): void {
      this.notificationsFCMSService.getAllNotificationsFcms().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.NotificationsFcms = res; // Si la réponse est déjà un tableau
          } else if (res && Array.isArray(res.data)) {
            this.NotificationsFcms = res.data; // Si la réponse est un objet avec un tableau dans 'data'
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Notification FCMS récupérées avec succès:', this.NotificationsFcms);
          this.updateNotificationsFcms(); // Met à jour la pagination après avoir récupéré les sections
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Notification FCMS:', err);
          // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
        }
      });
    }
  
    updateNotificationsFcms(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedNotificationsFcms = this.NotificationsFcms.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateNotificationsFcms(); // Met à jour la liste des sections paginées
      }
    }
  
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateNotificationsFcms(); // Met à jour la liste des sections paginées
      }
    }
  
    getTotalPages(): number {
      return this.NotificationsFcms.length ? Math.ceil(this.NotificationsFcms.length / this.itemsPerPage) : 1;
    }
  }

