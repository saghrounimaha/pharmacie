import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent,  TableDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-groups',
    templateUrl: './list-groups.component.html',
    styleUrls: ['./list-groups.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class ListGroupsComponent implements OnInit{

  submitted = false;
  id: number;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedClients: any[] = [];
  isLoading: boolean = false;


  Clients: any[] = [];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private activerouter: ActivatedRoute,
    private fb: FormBuilder,
    private clientService: ClientService
  ) {
    this.id = this.activerouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (res: any) => {
        this.Clients = res;
        console.log('Clients list fetched successfully:', res);
        this.updatePaginatedClients(); // Met à jour la pagination après avoir récupéré les clients
      },
      error: (err: any) => {
        console.error('Error fetching Clients list:', err);
      }
    });
  }

  deleteClient(id: number): void {
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
        this.clientService.deleteClient(id).subscribe({
          next: (res: any) => {
            console.log('Client deleted successfully:', res);
            Swal.fire({
              title: 'Deleted!',
              text: 'The Client has been deleted.',
              icon: 'success'
            });
            this.getAllClients();
          },
          error: (err: any) => {
            console.error('Error deleting Client :', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the Client .',
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

  updatePaginatedClients(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedClients = this.Clients.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedClients(); // Met à jour la liste des clients paginés
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedClients(); // Met à jour la liste des clients paginés
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.Clients.length / this.itemsPerPage);
  }

  

  readonly breakpoints: (string | boolean)[] = [true, 'sm', 'md', 'lg', 'xl', 'xxl'];
  readonly colors: string[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  readonly checkBoxes = this.formBuilder.group({
    one: false,
    two: false,
    three: true,
    four: true,
    five: { value: false, disabled: true }
  });

  readonly sampleList: string[] = [
    'Cras justo odio',
    'Dapibus ac facilisis in',
    'Morbi leo risus',
    'Porta ac consectetur ac',
    'Vestibulum at eros'
  ];

  setValue(controlName: string) {
    const prevValue = this.checkBoxes.get(controlName)?.value;
    const value = this.checkBoxes.getRawValue();
    value[controlName] = !prevValue;
    this.checkBoxes.setValue(value);
  }

  logValue() {
    console.log(this.checkBoxes.value);
    this.checkBoxes.reset();
  }

  getValue(controlName: string) {
    return this.checkBoxes.get(controlName);
  }
}
