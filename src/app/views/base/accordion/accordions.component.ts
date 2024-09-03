import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective, AvatarComponent, ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, TableDirective } from '@coreui/angular';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { DepotService } from 'src/app/services/depot.service';
import { PrivilegesService } from 'src/app/services/privileges.service';

@Component({
    selector: 'app-accordions',
    templateUrl: './accordions.component.html',
    styleUrls: ['./accordions.component.scss'],
    standalone: true,
    imports: [CommonModule,RouterLinkActive,RouterLink,FormsModule,ReactiveFormsModule,CommonModule,TableDirective,CardBodyComponent,CardComponent,CardHeaderComponent, ColComponent,
      RowComponent,AvatarComponent]
})
export class AccordionsComponent {
  users: any[] = [];
  privileges: any[] = [];
  depots: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  paginatedUsers: any[] = [];
  currentPhoto: string | ArrayBuffer | null = null; // Pour stocker la photo actuelle
  searchName: string = '';
  submitted = false;
  image!:string;
  isLoading: boolean = false;
  id = this.activerouter.snapshot.params['id'];
  selectedImage!: File ;
  imageError: String | null = null;


  UserForm : FormGroup = new FormGroup({
    name: new FormControl(''),
  
  
  })


  constructor(private userService: UserService, private activerouter: ActivatedRoute,private fb : FormBuilder,private depotService : DepotService, private privilegesService: PrivilegesService) {

  }

  ngOnInit(): void {
   
    this.UserForm= this.fb.group({
      photo: [''] ,
      name: [''],
      // email: ['', [Validators.required, Validators.email]],
      status: [''],
      login: [''],
      code: [''],
      adminclient: [''],
      // is_valid: [''],
      code_depot: [''],
      // old_password: [''],
      // test_password: [''],
      // last_connected: [''],
      id_cms_privileges: [''],
      id_depot: [''],
    });
    this.getAllUsers();
    this.getAllDepot();
    this.getAllPrivilege();
    this.getById(this.id)


  }

  // getById(id: number): void {
  //   this.userService.getUserById(id).subscribe({
  //     next: (res: any) => {
  //       this.UserForm.patchValue(res);
  //       console.log('User fetched successfully:', res);
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching user:', err);
  //     }
  //   });
  // }
  idUser!:number;
  getById(id: number): void {
    this.userService.getUserById(id).subscribe(
      (res: any) => {
        this.UserForm.patchValue(res);
        console.log(res);
        this.idUser = res.id;
      },
      (err: any) => {
        console.error('Error fetching user:', err);
      }
    );
  }
  


  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log('Selected file:', file); // Ajoutez cette ligne pour vérifier le fichier sélectionné
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // limit size to 2MB
        this.imageError = 'File size exceeds 2MB';
      } else {
        this.imageError = null;
        this.selectedImage = file;
      }
    }
  }


  updateUser(): void {
    this.submitted = true;
      const formData = new FormData();
      formData.append('name', this.UserForm.get('name')?.value);
      formData.append('code', this.UserForm.get('code')?.value);
      formData.append('adminclient', this.UserForm.get('adminclient')?.value);
      formData.append('login', this.UserForm.get('login')?.value);
      formData.append('id_cms_privileges', this.UserForm.get('id_cms_privileges')?.value);
      formData.append('id_depot', this.UserForm.get('id_depot')?.value);
      formData.append('status', this.UserForm.get('status')?.value);
      formData.append('code_depot', this.UserForm.get('code_depot')?.value);
      formData.append('photo', this.selectedImage);

        this.userService.updateUser(this.idUser, formData).subscribe({
            next: (response: any) => {
                console.log('API Response:', response);
                this.getAllUsers();
                if (response && Object.keys(response).length > 0) {
                    console.log('User updated successfully:', response);
                    Swal.fire({
                        title: 'Success!',
                        text: 'User updated successfully',
                        icon: 'success',
                    });
                } else {
                    console.log('Update successful, but no data returned from API.');
                    Swal.fire({
                        title: 'Success!',
                        text: 'User updated successfully, but no data returned.',
                        icon: 'success',
                    });
                }
            },
            error: (err: any) => {
                console.error('Error updating user:', err);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update user',
                    icon: 'error',
                });
            },
        });
    }

  
  


triggerFileInput(): void {
  (window.document.getElementById('photo') as HTMLInputElement).click();
}
scrollToForm() {
  const formElement = document.getElementById('formSection');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
}


  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.paginateUsers();
        console.log("getting all users",data);
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
      },
      complete: () => {
        console.log('All users fetched successfully');
      }
    });
  }

  getAllPrivilege(): void {
    this.privilegesService.allPrivileges().subscribe({
      next: (res: any) => {
        this.privileges = res;
        console.log('privileges list fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching privileges list:', err);
      }
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
      }
    });
  }

  searchUsers(): void {
    if (this.searchName.trim()) {
      this.userService.searchUsersByName(this.searchName).subscribe(
        (data:any) => {
          this.paginatedUsers = data;
          this.currentPage = 1; // Réinitialiser la page lors de la recherche
        },
        (error:any) => {
          console.error('Error searching users:', error);
          this.paginatedUsers = [];
        }
      );
    } else {
      this.loadUsers(); // Charger tous les utilisateurs si la recherche est vide
    }
  }

  // Fonction pour charger tous les utilisateurs
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data:any) => {
        this.paginatedUsers = data;
      },
      (error:any) => {
        console.error('Error loading users:', error);
      }
    );
  }


  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'path/to/default/image.jpg'; // Chemin vers une image par défaut si l'image principale ne se charge pas
    img.alt = 'Image non disponible'; // Texte alternatif pour l'image par défaut
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true; 
        this.userService.deleteUser(id).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllUsers(); // Recharger la liste des utilisateurs après suppression
          },
          error: (err: any) => {
            console.error('Error deleting user:', err);
          },
          complete: () => {
            this.isLoading = false; // Masquer l'indicateur de chargement
          }
        });
      }
    });
  }

  getImage(image:String){
    this.userService.getImage(image).subscribe((res:any)=>{
      console.log(res);
      this.image = res;
    })

  }

  paginateUsers(): void {
    // Calculer les index de début et de fin pour la pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    // Extraire les éléments de la page actuelle
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    // Vérifie que la page actuelle est supérieure à 1 pour aller à la page précédente
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
    }
  }

  goToNextPage(): void {
    // Vérifie que la page actuelle est inférieure au nombre total de pages pour aller à la page suivante
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.paginateUsers();
    }
  }

  getTotalPages(): number {
    // Calculer le nombre total de pages
    return Math.ceil(this.users.length / this.itemsPerPage);
  }
}

