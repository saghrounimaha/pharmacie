import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective
} from '@coreui/angular';
import Swal from 'sweetalert2';
import { DepotService } from 'src/app/services/depot.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
    RowComponent,RouterLink]
})
export class BreadcrumbsComponent implements OnInit {
  public items = <any>[];
  isLoading: boolean = false;


  depots:any[] = [];
  constructor(private depotService:DepotService, private userService : UserService , private tokenService: TokenService){

  }

  ngOnInit(): void {
    this.getAllDepot()
  }

    name!:string
  checkAutorization() {
    const userId = this.tokenService.extractUserId();
    if (userId !== null) {
        this.userService.CheckAuthorization(userId).subscribe((res: any) => {
            this.name = res.name;
        });
    } else {
        console.error('User ID is null');
    }
}


  getAllDepot(): void {
    this.depotService.getAllDepots().subscribe({
      next: (res: any) => {
        this.depots = res;
        console.log('Depot list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching depot list:', err);
      }
    });
  }

  deleteDepot(id: number): void {
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
        this.depotService.deleteDepot(id).subscribe({
          next: (res: any) => {
            console.log('Depot deleted successfully:', res);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
            this.getAllDepot(); // Recharger la liste des dépôts après suppression
          },
          error: (err: any) => {
            console.error('Error deleting depot:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete depot.',
              icon: 'error'
            });
          }
        });
      }
    });
  }


//   ngOnInit(): void {
//     this.items = [
//       { label: 'Home', url: '/', attributes: { title: 'Home' } },
//       { label: 'Library', url: '/' },
//       { label: 'Data', url: '/dashboard/' },
//       { label: 'CoreUI', url: '/' }
//     ];

//     setTimeout(() => {
//       this.items = [
//         { label: 'CoreUI', url: '/' },
//         { label: 'Data', url: '/dashboard/' },
//         { label: 'Library', url: '/' },
//         { label: 'Home', url: '/', attributes: { title: 'Home' } }
//       ];
//     }, 5000);
//   }
// }
}