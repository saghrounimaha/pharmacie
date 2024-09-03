import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnnoncesService } from 'src/app/services/annonces.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-annonces',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-annonces.component.html',
  styleUrl: './add-annonces.component.scss'
})
export class AddAnnoncesComponent {
  selectedFile!: File ;
  imageError: String | null = null;
  submitted = false;
  id = this.route.snapshot.params['id']
  annoncForm: FormGroup = new FormGroup(
    {
      titre: new FormControl(''),
      fichier: new FormControl(''),
  
  
    }
  )
  constructor(private route : ActivatedRoute,private FB:FormBuilder, private annonceService:AnnoncesService){

  }

  ngOnInit(): void {
this.annoncForm=this.FB.group({
      titre:["",Validators.required],
      fichier:[""],
  })
  }    
      // addAnnonce(){
      //   this.submitted=true
      //   if(this.annoncForm.valid){
      //     this.annonceService.createAnnonces(this.annoncForm.value).subscribe((annonce:any)=>{
      //       console.log("Annonce added successfuly",annonce)
      //     })
      //   }
      // }

      onFileChange(event: any): void {
        const file = event.target.files[0];
        console.log('Selected file:', file); // Ajoutez cette ligne pour vérifier le fichier sélectionné
        if (file) {
          if (file.size > 2 * 1024 * 1024) { // limit size to 2MB
            this.imageError = 'File size exceeds 2MB';
          } else {
            this.imageError = null;
            this.selectedFile = file;
          }
        }
      }
    
    
      AddAnnonce(): void {
        this.submitted = true;
          const formData = new FormData();
          formData.append('titre', this.annoncForm.get('titre')?.value);
          formData.append('fichier', this.selectedFile);

            this.annonceService.createAnnonces(formData).subscribe({
                next: (response: any) => {
                    console.log('API Response:', response);
                    console.log('Added annonce successfuly:', formData);

                    // this.getAllUsers();
                },
                error: (err: any) => {
                    console.error('Error adding annonce:', err);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to adding annonce',
                        icon: 'error',
                    });
                },
            });
        }
    
      


}
