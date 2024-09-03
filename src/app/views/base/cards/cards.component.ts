import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
} from '@coreui/angular';
import { PrivilegesService } from 'src/app/services/privileges.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

type CardColor = {
  color: string
  textColor?: string
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent,RouterLink
  ]
})
export class CardsComponent implements OnInit{

  isLoading: boolean = false;
  privileges:any[]=[];
  constructor(private privilegeService : PrivilegesService){}
  ngOnInit(): void {
    this.getAllPrivilege()
  }
  colors: CardColor[] = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];

  imgContext = { $implicit: 'top', bottom: 'bottom' };

  tabs = ['Active', 'List', 'Disabled']


  getAllPrivilege(): void {
    this.privilegeService.allPrivileges().subscribe({
      next: (res: any) => {
        this.privileges = res;
        console.log('privileges list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching privileges list:', err);
      }
    });
  }

  deletePrivilege(id: number): void {
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
        this.privilegeService.deletePrivileges(id).subscribe({
          next: (res: any) => {
            console.log('Privilege deleted successfully:', res);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
            this.getAllPrivilege(); // Recharger la liste des dépôts après suppression
          },
          error: (err: any) => {
            console.error('Error deleting Privilege:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete Privilege.',
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


}
