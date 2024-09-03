import { PrivilegesService } from './../../../services/privileges.service';
import { DepotService } from './../../../services/depot.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [RouterLink,CommonModule,RouterLink,FormsModule,ReactiveFormsModule,ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent implements OnInit{

  privileges: any[] = []; // Variable pour stocker les privilèges
    depots: any[] = [];
    selectedImage: File | null = null;
    imageError: String | null = null;
    registerForm!: FormGroup;

  constructor(private renderer: Renderer2, private authService: AuthService, private fb: FormBuilder, private privilegeService: PrivilegesService, private depotService: DepotService) { }

  ngOnInit(): void {
    this.getAllPrivileges();
      this.getAllDepot();
  
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        code: ['', Validators.required],
        adminclient: ['', Validators.required],
        login: ['', Validators.required],
        status: ['', Validators.required],
        id_cms_privileges: ['', Validators.required],
        id_depot: ['', Validators.required],
      });
  }
  getAllPrivileges() {
    this.privilegeService.allPrivileges().subscribe({
      next: (data: any) => {
        this.privileges = data;
      },
      error: (err: any) => {
        console.error('Error fetching privileges:', err);
      },
      complete: () => {
        console.log('All privileges fetched successfully');
      }
    });
  }

  getAllDepot() {
    this.depotService.getAllDepots().subscribe({
      next: (data: any) => {
        this.depots = data;
      },
      error: (err: any) => {
        console.error('Error fetching depots:', err);
      },
      complete: () => {
        console.log('All depots fetched successfully');
      }
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log('Selected file:', file); // Ajoutez cette ligne pour vérifier le fichier sélectionné
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // limit size to 2MB
        this.imageError = 'File size exceeds 2MB';
        this.selectedImage = null;
      } else {
        this.imageError = null;
        this.selectedImage = file;
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid && this.selectedImage) {
      console.log('Form is valid and image is selected');
      
      const formData = new FormData();
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('code', this.registerForm.get('code')?.value);
      formData.append('adminclient', this.registerForm.get('adminclient')?.value);
      formData.append('login', this.registerForm.get('login')?.value);
      formData.append('id_cms_privileges', this.registerForm.get('id_cms_privileges')?.value);
      formData.append('id_depot', this.registerForm.get('id_depot')?.value);
      formData.append('status', this.registerForm.get('status')?.value);
      formData.append('photo', this.selectedImage);
      
      this.authService.register(formData).subscribe({
        next: (res: any) => {
          console.log('Response:', res);
          Swal.fire({
            title: 'Registration Successful!',
            text: 'Please check your email to validate your account.',
            icon: 'success',
          });
        },
        error: (err: any) => {
          console.error('Error:', err);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to register user',
            icon: 'error',
          });
        },
        complete: () => {
          console.log("Register complete");
        }
      });
    } else {
      console.log("Form is invalid or image is not selected");
      console.log(this.registerForm.errors); // Added for debugging
    }
  }
}
