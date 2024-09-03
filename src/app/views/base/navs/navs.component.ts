import { ProduitService } from './../../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navs',
    templateUrl: './navs.component.html',
    styleUrls: ['./navs.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLinkActive,
        CommonModule,
        TableDirective,
        CardBodyComponent,
        CardComponent,
        CardHeaderComponent,
        ColComponent,
        RowComponent,
        RouterLink
    ]
})
export class NavsComponent implements OnInit {

    submitted = false;
    id: number;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    paginatedProducts: any[] = [];
    
    Products: any[] = [];
    filteredProducts: any[] = [];
    searchForm!: FormGroup;

    constructor(
        private produitService: ProduitService,
        private activerouter: ActivatedRoute,
        private fb: FormBuilder
    ) { 
        this.id = this.activerouter.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.getAllProducts();
        this.searchForm = this.fb.group({
            numprod: [''],
            lib_prod: [''],
            cb: [''],
            lib_cb: [''],
            pres_cb: [''],
            lib_section: [''],
            pres_prod: [''],
            code_depot: [''],
            code_section: [''],
            active_shop: [false],
        });

        // Initially show all products
        this.filteredProducts = this.Products;
    }

    getAllProducts(): void {
        this.produitService.getAllProducts().subscribe({
            next: (res: any) => {
                this.Products = res;
                this.filteredProducts = this.Products; // Initialize the filtered list
                this.updatePaginatedProducts(); // Update pagination after fetching the products
                console.log('Products list fetched successfully:', res);
            },
            error: (err: any) => {
                console.error('Error fetching Products list:', err);
            }
        });
    }

    updatePaginatedProducts(): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    }

    goToPreviousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedProducts();
        }
    }

    goToNextPage(): void {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
            this.updatePaginatedProducts();
        }
    }

getTotalPages(): number {
        return this.filteredProducts.length ? Math.ceil(this.filteredProducts.length / this.itemsPerPage) : 1;
    }

    searchProducts(): void {
      const searchCriteria = this.searchForm.value;
      console.log('Search Criteria:', searchCriteria);
    
      this.filteredProducts = this.Products.filter(product => {
          console.log('Product:', product);
          return (
              (!searchCriteria.numprod || product.numprod?.toString().includes(searchCriteria.numprod)) &&
              (!searchCriteria.lib_prod || product.lib_prod?.toLowerCase().includes(searchCriteria.lib_prod.toLowerCase())) &&
              (!searchCriteria.cb || product.cb?.includes(searchCriteria.cb)) &&
              (!searchCriteria.lib_cb || product.lib_cb?.toLowerCase().includes(searchCriteria.lib_cb.toLowerCase())) &&
              (!searchCriteria.pres_cb || product.pres_cb?.includes(searchCriteria.pres_cb)) &&
              (!searchCriteria.lib_section || product.lib_section?.toLowerCase().includes(searchCriteria.lib_section.toLowerCase())) &&
              (!searchCriteria.pres_prod || product.pres_prod?.includes(searchCriteria.pres_prod)) &&
              (!searchCriteria.code_depot || product.code_depot?.includes(searchCriteria.code_depot)) &&
              (!searchCriteria.code_section || product.code_section?.includes(searchCriteria.code_section)) &&
              (searchCriteria.active_shop === undefined || searchCriteria.active_shop === product.active_shop)
          );
      });
  
      console.log('Filtered Products:', this.filteredProducts);
    }
  
  
  

    onSubmit(): void {
      console.log(this.searchForm.value);
        this.searchProducts();
    }
}
