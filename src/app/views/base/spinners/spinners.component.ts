import { EmailTemplateService } from './../../../services/email-template.service';
import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, SpinnerComponent, ButtonDirective, TableDirective } from '@coreui/angular';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-spinners',
    templateUrl: './spinners.component.html',
    styleUrls: ['./spinners.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class SpinnersComponent {

  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedEmailTemplates: any[] = []; // Remplacez 'any' par le type approprié si disponible
  EmailTemplates: any[] = []; // Remplacez 'any' par le type approprié si disponible

  constructor(
    private activerouter: ActivatedRoute,
    private emailService: EmailTemplateService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }

  ngOnInit(): void {
    this.getAllEmailTemplates(); // Correction du nom de la méthode
  }

  getAllEmailTemplates(): void { // Correction du nom de la méthode
    this.emailService.getAllEmailTemplate().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.EmailTemplates = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.EmailTemplates = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Unexpected response format:', res);
          return;
        }
        console.log('Email templates fetched successfully:', this.EmailTemplates);
        this.updateEmailTemplates(); // Met à jour la pagination après avoir récupéré les paramètres
      },
      error: (err: any) => {
        console.error('Error fetching email templates list:', err);
      }
    });
  }

  updateEmailTemplates(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmailTemplates = this.EmailTemplates.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateEmailTemplates(); // Met à jour la liste des templates paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateEmailTemplates(); // Met à jour la liste des templates paginés
    }
  }

  getTotalPages(): number {
    return this.EmailTemplates.length ? Math.ceil(this.EmailTemplates.length / this.itemsPerPage) : 1;
  }
}
