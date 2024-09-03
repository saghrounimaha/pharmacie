import { ReactiveFormsModule } from '@angular/forms';
import { SectionsService } from './../../../services/sections.service';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RoundedDirective,
  RowComponent,
  TabDirective,
  TableDirective,
  TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent,RouterLink
  ]
})
export class AppTabsComponent implements OnInit{

  public panes = [
    { name: 'Home 01', id: 'tab-01', icon: 'cilHome' },
    { name: 'Profile 02', id: 'tab-02', icon: 'cilUser' },
    { name: 'Contact 03', id: 'tab-03', icon: 'cilCode' }
  ];

  activeItem = signal(0);

  handleActiveItemChange(value: string | number | undefined) {
    this.activeItem.set(<number>value);
  }
  id: number;
  submitted = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedSections: any[] = []; // Remplacez 'any' par le type approprié si disponible
  Sections: any[] = []; // Remplacez 'any' par le type approprié si disponible
  
  constructor(
    private activerouter: ActivatedRoute,
    private sectionService: SectionsService
  ) {
    this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
  }
  
  ngOnInit(): void {
    this.getAllSections(); // Correction du nom de la méthode
  }
  
  getAllSections(): void { // Correction du nom de la méthode
    this.sectionService.getAllSections().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.Sections = res; // Si la réponse est déjà un tableau
        } else if (res && Array.isArray(res.data)) {
          this.Sections = res.data; // Si la réponse est un objet avec un tableau dans 'data'
        } else {
          console.error('Unexpected response format:', res);
          return;
        }
        console.log('Sections fetched successfully:', this.Sections);
        this.updateSections(); // Met à jour la pagination après avoir récupéré les sections
      },
      error: (err: any) => {
        console.error('Error fetching sections list:', err);
      }
    });
  }
  
  updateSections(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSections = this.Sections.slice(startIndex, endIndex);
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateSections(); // Met à jour la liste des sections paginées
    }
  }
  
  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateSections(); // Met à jour la liste des sections paginées
    }
  }
  
  getTotalPages(): number {
    return this.Sections.length ? Math.ceil(this.Sections.length / this.itemsPerPage) : 1;
  }
  
}
