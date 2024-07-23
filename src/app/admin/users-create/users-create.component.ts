import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [FormsModule, RouterLink, NgOptimizedImage, NgIf, NgClass],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.scss'
})
export class UsersCreateComponent implements AfterViewInit {
  user: any = {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(
    private userService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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
    const roleInput = document.querySelector('input[name="role"]');
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
    if (roleInput && roleInput['value']) {
      // @ts-ignore
      roleInput.closest('.input-div').classList.add('focus');
    }
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      try {
        const response = await this.userService.createUser(this.user);
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

  // createUser() {
  //   this.userService.createUser(this.user).subscribe({
  //     next: (response) => {
  //       console.log('User created successfully', response);
  //       this.router.navigate(['users']);
  //     },
  //     error: (error) => console.error('Error creating user', error)
  //   })
  // }
}
