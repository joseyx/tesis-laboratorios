import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [FormsModule, RouterLink, NgOptimizedImage, NgIf, NgClass],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss'
})
export class UsersEditComponent implements OnInit, AfterViewInit {

  user: any = {
    image: '',
    role: '',
  };

  errorMessage = '';
  successMessage = '';

  userID!: number;

  constructor(
    private userService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.userID = +this.route.snapshot.paramMap.get('id')!;
      this.getUser(this.userID);
    }
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.checkAutofill();
    // }, 100);
  }

  // checkAutofill() {
  //   const imageInput = document.querySelector('input[name="image"]');
  //   const roleInput = document.querySelector('input[name="role"]');
  //   // @ts-ignore
  //   if (imageInput && imageInput['value']) {
  //     // @ts-ignore
  //     imageInput.closest('.input-div').classList.add('focus');
  //   }
  //   // @ts-ignore
  //   if (roleInput && roleInput['value']) {
  //     // @ts-ignore
  //     roleInput.closest('.input-div').classList.add('focus');
  //   }
  // }

  // getUser(id: number) {
  //   this.userService.getUser(id).subscribe({
  //     next: (user: any) => {
  //       this.user = user;
  //       console.log('User fetched succssfully', user);
  //     },
  //     error: (error) => console.error('There was an error!', error)
  //   })
  // }
  async getUser(id: number) {
    this.user = await this.userService.getUser(id);
    console.log('User fetched successfully', this.user);
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      try {
        const response = await this.userService.updateUser(this.user);
        console.log('User updated successfully', response);
        this.successMessage = 'Usuario actualizado exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 2000);
      } catch (error) {
        console.error('Error updating user', error);
        // @ts-ignore
        if (error.response && error.response.data) {
          // @ts-ignore
          if (error.response.data.error === 'File not an image') {
            this.errorMessage = 'Seleccione una imagen válida.';
          } else {
            // @ts-ignore
            this.errorMessage = error.response.data.detail || 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
          }
        } else {
          this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    } else {
      console.log('Form is invalid or passwords do not match');
    }
  }

  onFileChange(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.user.image = e.target.result; // Puedes almacenar la URL base64 si deseas mostrar una vista previa de la imagen
          console.log('Imagen cargada', this.user.image);
        };
        reader.readAsDataURL(file);
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Solo se permiten archivos de tipo JPG, JPEG o PNG.';
      }
    } else {
      this.errorMessage = 'No se ha seleccionado ningún archivo.';
    }
  }
}
