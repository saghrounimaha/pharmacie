import { CommandeService } from './../../../services/commande.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepotService } from 'src/app/services/depot.service';
import { GroupeService } from 'src/app/services/groupe.service';
import { ModeService } from 'src/app/services/mode.service';
import { SectionsService } from 'src/app/services/sections.service';
import { StatusCommandesService } from 'src/app/services/status-commandes.service';
import { TypeCommandesService } from 'src/app/services/type-commandes.service';
import { isJSDocThisTag } from 'typescript';

@Component({
  selector: 'app-addcommande',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './addcommande.component.html',
  styleUrl: './addcommande.component.scss'
})
export class AddcommandeComponent implements OnInit{
  commandeForm: FormGroup;
  submitted = false;
  depots: any[] = [];
  modePayements: any[] = [];
  Groupes: any[] = [];
  Sections: any[] = [];
  statusCommandes: any[] = [];
  typeCommandes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private groupeService: GroupeService,
    private depotService: DepotService,
    private modePayementService: ModeService,
    private sectionService: SectionsService,
    private statusCommandeService: StatusCommandesService,
    private typeCommandeService: TypeCommandesService,
    private commandeService: CommandeService
  ) {
    this.commandeForm = this.fb.group({
      id_depot: ['', Validators.required],
      dateliv: ['', Validators.required],
      id_section: ['', Validators.required],
      id_modepayement: ['', Validators.required],
      dateheurecloture: ['', Validators.required],
      groupe: ['', Validators.required],
      id_status: ['', Validators.required],
      id_typecommande: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllDepot();
    this.getAllModeDePayement();
    this.getAllSections();
    this.getAllTypeCommande();
    this.getAllStatusCommande();
    this.getAllGroupes();
  }

  getAllSections(): void {
    this.sectionService.getAllSections().subscribe({
      next: (res: any[]) => {
        this.Sections = res;
      },
      error: (err: any) => {
        console.error('Error fetching sections:', err);
      }
    });
  }

  getAllTypeCommande(): void {
    this.typeCommandeService.getAllTypeCommande().subscribe({
      next: (res: any) => {
        this.typeCommandes = res;
        console.log('type Commandes list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching type Commandes list:', err);
      },
    });
  }

  getAllStatusCommande(): void {
    this.statusCommandeService.getAllStatusCommande().subscribe({
      next: (res: any) => {
        this.statusCommandes = res;
        console.log('status Commande fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching status Commande:', err);
      },
    });
  }

  getAllDepot(): void {
    this.depotService.getAllDepots().subscribe({
      next: (res: any) => {
        this.depots = res;
        console.log('Depot list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching depot list:', err);
      },
    });
  }

  getAllModeDePayement(): void {
    this.modePayementService.getAllModePayement().subscribe({
      next: (res: any) => {
        this.modePayements = res;
        console.log('Mode de Paiement list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching Mode de Paiement list:', err);
      },
    });
  }

  getAllGroupes(): void {
    this.groupeService.getAllGroupes().subscribe({
      next: (res: any) => {
        this.Groupes = res;
        console.log('Groupes list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching Groupes list:', err);
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.commandeForm.valid) {
      this.commandeService.createCommande(this.commandeForm.value).subscribe((commande: any) => {
        console.log('Commande added successfully', commande);
      });
    }
  }
}