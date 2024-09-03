import { AuthService } from './../../../services/auth.service';
import { TokenService } from './../../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule,RouterLink,FormsModule,ReactiveFormsModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private authservice:AuthService , private tokenService:TokenService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.tokenService.storeToken(res.access_token);
          window.location.replace('/dashboard');
          console.log(res);
        },
        error: (err: any) => {
          // Affiche une alerte en fonction du type d'erreur
          if (err.status === 401) {
            // Erreur d'authentification, afficher un message d'alerte
            Swal.fire({
              title: 'Erreur!',
              text: 'Email ou mot de passe invalide.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          } else {
            // Autres erreurs
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur est survenue. Veuillez réessayer.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        complete: () => {
          console.log('Login complete');
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