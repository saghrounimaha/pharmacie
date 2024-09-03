import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.scss'],
    standalone: true,
    imports: [CommonModule,RouterLink,FormsModule,ReactiveFormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class ResetpasswordComponent implements OnInit{
  token!: string;

  resetForm!: FormGroup;
  // token =this.activerouter.snapshot.params['device_key'];

  constructor(private activerouter:ActivatedRoute,private tokenService : TokenService,private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;

    this.resetForm = this.fb.group({

      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
  // onSubmit(): void {
  //   if (this.resetForm.valid) {

  //     this.authService.resetPassword(this.token, this.resetForm.value).subscribe({
  //       next: () => {
  //         Swal.fire({
  //           title: 'Succès!',
  //           text: 'Votre mot de passe a été réinitialisé.',
  //           icon: 'success',
  //           confirmButtonText: 'OK'
  //         }).then(() => {
  //           this.router.navigate(['/login']); // Redirection vers la page de connexion
  //         });
  //       },
  //       error: (err: any) => {
  //         Swal.fire({
  //           title: 'Erreur!',
  //           text: 'Une erreur est survenue.',
  //           icon: 'error',
  //           confirmButtonText: 'OK'
  //         });
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       title: 'Formulaire invalide!',
  //       text: 'Veuillez vérifier les informations saisies.',
  //       icon: 'warning',
  //       confirmButtonText: 'OK'
  //     });
  //   }
  // }

  // onSubmit(): void {
  //     // this.authService.resetPassword(this.token,this.resetForm.value).subscribe(
  //     //   (res:any) =>{

  //     //     console.log("success");
  //     //     this.router.navigate(['/login'])},
  //     //   error => console.error('Erreur lors de la réinitialisation du mot de passe:', error)
  //     // );

  //     this.authService.resetPassword(this.token, this.resetForm.value).subscribe(
  //       (res: any) => {
  //           console.log("success",res);
  //           this.router.navigate(['/login']);
  //       },
  //       error => console.error('Erreur lors de la réinitialisation du mot de passe:', error)
  //   );
    
    
  // }


  onSubmit(): void {
    if (this.resetForm.valid) {
        this.authService.resetPassword(this.token, this.resetForm.value).subscribe(
            (res: any) => {
                console.log("success", res);
                this.router.navigate(['/login']);
            },
            error => console.error('Erreur lors de la réinitialisation du mot de passe:', error)
        );
    }
}

}