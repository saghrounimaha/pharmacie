import { MenusService } from './../../../services/menus.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent implements OnInit{

  id: number;
    submitted = false;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedMenus: any[] = [];
    Menus: any[] = [];
  
    constructor(
      private activerouter: ActivatedRoute,
      private menusService: MenusService
    ) {
      this.id = Number(this.activerouter.snapshot.params['id']); // Conversion de l'ID en nombre
    }
  
    ngOnInit(): void {
      this.getAllCmsMenus();
    }
  
    getAllCmsMenus(): void {
      this.menusService.getAllCmsMenus().subscribe({
        next: (res: any) => {
          if (Array.isArray(res)) {
            this.Menus = res; 
          } else if (res && Array.isArray(res.data)) {
            this.Menus = res.data; 
          } else {
            console.error('Format de réponse inattendu:', res);
            return;
          }
          console.log('Menus récupérées avec succès:', this.Menus);
          this.updateMenus(); 
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération des Menus:', err);
        }
      });
    }
  
    updateMenus(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedMenus = this.Menus.slice(startIndex, endIndex);
    }
  
    goToPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateMenus(); 
      }
    }
    goToNextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updateMenus(); 
      }
    }
  
    getTotalPages(): number {
      return this.Menus.length ? Math.ceil(this.Menus.length / this.itemsPerPage) : 1;
    }
  }

