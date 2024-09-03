import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.scss'],
    standalone: true,
    imports: [CommonModule,RouterLink,FormsModule,ReactiveFormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class ForgotpasswordComponent implements OnInit{
  emailForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      this.authService.forgetPassword(this.emailForm.value).subscribe({
        next: (res:any) => {
          console.log("validation email succes , ",res);
          Swal.fire({
            title: 'Succès!',
            text: 'Un email de réinitialisation a été envoyé.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // window.location.href = '/verify-email'; // Redirection vers la page de vérification
          });
        },
        error: (err: any) => {
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur est survenue.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Formulaire invalide!',
        text: 'Veuillez vérifier les informations saisies.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}