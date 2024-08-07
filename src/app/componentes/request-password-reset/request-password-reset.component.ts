import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-request-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.scss'
})
export class RequestPasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.resetForm.valid) {
      try {
        const response = await this.authService.requestPasswordReset(this.resetForm.value.email);
        this.successMessage = 'Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico.';
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.detail || 'Ocurrió un error al solicitar el restablecimiento de la contraseña. Asegúrese de haber ingresado el correo correcto.';
        this.successMessage = '';
      }
    } else {
      this.resetForm.get('email')?.markAsTouched();
      this.errorMessage = 'Por favor, ingrese una dirección de correo electrónico válida.';
      this.successMessage = '';
    }
  }
}
