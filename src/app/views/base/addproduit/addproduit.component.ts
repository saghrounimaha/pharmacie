import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepotService } from 'src/app/services/depot.service';
import { ProduitService } from 'src/app/services/produit.service';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-addproduit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addproduit.component.html',
  styleUrl: './addproduit.component.scss'
})
export class AddproduitComponent implements OnInit{
  productForm!: FormGroup;
  depots: any[] = [];
  sections: any[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private depotService: DepotService,
    private sectionService: SectionsService,private produitService:ProduitService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepots();
    this.loadSections();
  }

  initForm() {
    this.productForm = this.fb.group({
      numprod: ['',Validators.required],
      lib_prod: ['',Validators.required],
      cb: ['',Validators.required],
      lib_cb: ['',Validators.required],
      pres_cb: ['',Validators.required],
      lib_dci: ['',Validators.required],
      id_depot:['',Validators.required],
      id_section:['',Validators.required],
      lib_section: ['',Validators.required],
      pres_prod: ['',Validators.required],
      code_depot: ['',Validators.required],
      code_section: ['',Validators.required],
      unitecarton: ['',Validators.required],
      unitecartouche: ['',Validators.required],
      active_shop: ['',Validators.required],
    });
  }

  loadDepots() {
    this.depotService.getAllDepots().subscribe(
      data => this.depots = data,
      error => console.error('Error fetching depots', error)
    );
  }

  loadSections() {
    this.sectionService.getAllSections().subscribe( (data) => { 
      this.sections = data
console.log("all sections",data);
    },

      error => console.error('Error fetching sections', error)
    );
  }

  addProduit() {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.produitService.createProduct(this.productForm.value).subscribe((produit:any)=>{
        console.log("produit added successfuly",produit)
      })
      return;
    }

    // Handle form submission
    console.log(this.productForm.value);
  }



  resetForm() {
    this.productForm.reset();
    this.submitted = false;
  }
}