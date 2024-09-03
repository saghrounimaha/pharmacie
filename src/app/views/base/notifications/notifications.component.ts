import { CommonModule } from '@angular/common';
import { NotificationsService } from './../../../services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit{

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedNotifications: any[] = [];
    Notifications: any[] = [];
  
    constructor(
      private activerouter: ActivatedRoute,
      private notificationsService: NotificationsService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllNotifications();
    }
  
    getAllNotifications(): void {
      this.notificationsService.getAllNotifications().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.Notifications = res; // Si la réponse est déjà un tableau
          } else if (res && Array.isArray(res.data)) {
            this.Notifications = res.data; // Si la réponse est un objet avec un tableau dans 'data'
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Notification récupérées avec succès:', this.Notifications);
          this.updateNotifications(); // Met à jour la pagination après avoir récupéré les sections
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Notification:', err);
          // Vous pouvez ajouter un service de notification ici pour informer l'utilisateur
        }
      });
    }
  
    updateNotifications(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedNotifications = this.Notifications.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateNotifications(); // Met à jour la liste des sections paginées
      }
    }
  
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateNotifications(); // Met à jour la liste des sections paginées
      }
    }
  
    getTotalPages(): number {
      return this.Notifications.length ? Math.ceil(this.Notifications.length / this.itemsPerPage) : 1;
    }
  }

