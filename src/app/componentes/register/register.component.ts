import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage, RouterLink, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  focus = false;
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  setFocus(hasFocus: boolean) {
    this.focus = hasFocus;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkAutofill();
    }, 100);
  }

  checkAutofill() {
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
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
    if (passwordInput && passwordInput['value']) {
      // @ts-ignore
      passwordInput.closest('.input-div').classList.add('focus');
    }
    // @ts-ignore
    if (confirmPasswordInput && confirmPasswordInput['value']) {
      // @ts-ignore
      confirmPasswordInput.closest('.input-div').classList.add('focus');
    }
  }

  get passwordsDoNotMatch(): boolean {
    return this.password !== this.confirmPassword;
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid && !this.passwordsDoNotMatch) {
      try {
        const response = await this.authService.register(this.name, this.email, this.password);
        console.log('Registration successful', response);
        this.successMessage = 'Registro exitoso. Redirigiendo al inicio de sesión...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } catch (error) {
        console.error('Registration error', error);
        // @ts-ignore
        if (error.response && error.response.data) {
          // @ts-ignore
          if (error.response.data.error === 'Email already in use') {
            this.errorMessage = 'El correo electrónico ya está en uso. Por favor, usa otro correo.';
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

}
