import { PrivilegeRoleService } from './../../../services/privilege-role.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective} from '@coreui/angular';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PrivilegesService } from 'src/app/services/privileges.service';

@Component({
    selector: 'app-carousels',
    templateUrl: './carousels.component.html',
    styleUrls: ['./carousels.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,RouterLinkActive,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,RouterLink]
})
export class CarouselsComponent implements OnInit{

  privilegesRoleForm!: FormGroup;
  submitted = false;
  id: number;

  privilegesRole: any[] = [];
  privileges: any[] = [];
  isLoading: boolean = false;


  ngOnInit(): void {
    this.getAllPrivilegeRole();
    this.getAllPrivilege();

    this.privilegesRoleForm = this.fb.group({
      is_visible: [''],
      is_create: [''],
      is_read: [''],
      is_edit: [''],
      is_delete: [''],
      id_cms_privileges: [''],
    });

    if (this.id) {
      this.getPrivilegesRoleById(this.id);
    } else {
      console.error('ID is undefined, cannot fetch data.');
      // Affichez un message d'erreur ou redirigez si nécessaire
    }
  }


  getPrivilegesRoleById(id: number): void {
    this.privilegeRoleService.getPrivilegesRoleById(id).subscribe({
      next: (res: any) => {
        this.privilegesRoleForm.patchValue(res);
        console.log('privileges Role fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching privileges Roles:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Could not fetch privileges Role data.',
          icon: 'error'
        });
      }
    });
  }
  updatePrivilegeRole(): void {
    this.submitted = true;
    this.privilegeRoleService.updatePrivilegesRole(this.id, this.privilegesRoleForm.value).subscribe({
      next: (response: any) => {
        console.log('privilege Role updated successfully:', response);
        Swal.fire({
          title: 'Success!',
          text: 'privilege Role updated successfully',
          icon: 'success'
        });
      },
      error: (err: any) => {
        console.error('Error updating privilege Role:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update privilege Role.',
          icon: 'error'
        });
      }
    });
  }

//  methode pour scrolli au dessous lors de cliquer button update dans la liste 
  scrollToForm() {
    const formElement = document.getElementById('formSection');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

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

  constructor(
    private domSanitizer: DomSanitizer,private privilegeRoleService : PrivilegeRoleService ,     private activerouter: ActivatedRoute , private fb : FormBuilder, private privilegeService : PrivilegesService) {
    this.id = this.activerouter.snapshot.params['id'];

    this.slides[0] = [
      {
        id: 0,
        src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[0]),
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
        id: 1,
        src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[1]),
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 2,
        src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[2]),
        title: 'Third slide',
        subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
    ];

    this.slides[1] = [
      {
        id: 0,
        src: this.imageSrc[3],
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
        id: 1,
        src: this.imageSrc[4],
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 2,
        src: this.imageSrc[5],
        title: 'Third slide',
        subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
    ];

    this.slides[2] = [
      {
        id: 0,
        src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[0]),
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
        id: 1,
        src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[1]),
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 2,
        src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[2]),
        title: 'Third slide',
        subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
    ];

  }
  readonly imageSrc: string[] = [
    'assets/images/angular.jpg',
    'assets/images/react.jpg',
    'assets/images/vue.jpg',
    'https://picsum.photos/id/1/800/400',
    'https://picsum.photos/id/1026/800/400',
    'https://picsum.photos/id/1031/800/400'
  ];

  readonly slidesLight: string[] = [
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23AAA%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23F5F5F5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23BBB%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23E5E5E5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
  ];

  readonly slides: any[][] = [];

  getAllPrivilegeRole(): void {
    this.privilegeRoleService.allPrivilegesRole().subscribe({
      next: (res: any) => {
        this.privilegesRole = res;
        console.log('Privilege Role list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching Privilege Role list:', err);
      }
    });
  }

  deletePrivilegeRole(id: number): void {
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
        this.privilegeRoleService.deletePrivilegesRole(id).subscribe({
          next: (res: any) => {
            console.log('Privilege Role deleted successfully:', res);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
            this.getAllPrivilegeRole();
          },
          error: (err: any) => {
            console.error('Error deleting Privilege Role:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete Privilege Role.',
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
  


  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

}
