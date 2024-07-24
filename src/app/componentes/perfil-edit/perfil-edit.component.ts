import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [FormsModule, RouterLink, NgOptimizedImage, NgIf, NgClass],
  templateUrl: './perfil-edit.component.html',
  styleUrl: './perfil-edit.component.scss'
})
export class PerfilEditComponent implements OnInit, AfterViewInit {
  user: any = {
    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
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
      this.loadUser(this.userID);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkAutofill();
    }, 100);
  }

  checkAutofill() {
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const imageInput = document.querySelector('input[name="image"]');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
    // @ts-ignore
    if (nameInput && nameInput['value']) {
      // @ts-ignore
      nameInput.closest('.input-div').classList.add('focus');
    }
    // @ts-ignore
    if (emailInput && emailInput['value']) {
      // @ts-ignore
      emailInput.closest('.input-div').classList.add('focus');
    }
    // @ts-ignore
    if (phoneInput && phoneInput['value']) {
      // @ts-ignore
      phoneInput.closest('.input-div').classList.add('focus');
    }
    // @ts-ignore
    if (passwordInput && passwordInput['value']) {
      // @ts-ignore
      passwordInput.closest('.input-div').classList.add('focus');
    }
    // @ts-ignore
    if (confirmPasswordInput && confirmPasswordInput['value']) {
      // @ts-ignore
      confirmPasswordInput.closest('.input-div').classList.add('focus');
    }
    // @ts-ignore
    if (imageInput && imageInput['value']) {
      // @ts-ignore
      imageInput.closest('.input-div').classList.add('focus');
    }
  }

  loadUser(id: number) {
    this.userService.getUserID(id)
    .then((user: any) => {
      this.user = user;
      console.log('User retrieved successfully', user);
    })
    .catch((error: any) => {
      console.error('Error fetching user', error);
    });
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      try {
        const response = await this.userService.updateUser(this.userID, this.user);
        console.log('User updated successfully', response);
        this.successMessage = 'Usuario actualizado exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/perfil']);
        }, 2000);
      } catch (error) {
        console.error('Error updating user', error);
        // @ts-ignore
        if (error.response && error.response.data) {
          // @ts-ignore
          if (error.response.data.error === 'Email already in use') {
            this.errorMessage = 'El correo electrónico ya está en uso.';
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
