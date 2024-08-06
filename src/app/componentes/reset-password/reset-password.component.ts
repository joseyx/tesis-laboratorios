import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';;
  token: string = '';
  uidb64: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password2: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator});
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.uidb64 = this.route.snapshot.params['uidb64'];
    console.log('Token:', this.token);
    console.log('Uidb64:', this.uidb64);
  }

  passwordsMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('password2')?.value ? null : { mismatch: true };
  }

  get password() {
    return this.resetForm.get('password');
  }

  get password2() {
    return this.resetForm.get('password2');
  }

  async onSubmit() {
    if (this.resetForm.valid) {
      const password = this.resetForm.value.password;
      try {
        const response = await this.authService.setNewPassword(this.uidb64, this.token, password);
        this.successMessage = 'Contraseña reestablecida correctamente';
        this.errorMessage = '';
      } catch (error: any) {
        this.errorMessage = error.message || 'Error al reestablecer la contraseña';
        this.successMessage = '';
      }
    } else {
      this.resetForm.get('password')?.markAsTouched();
      this.resetForm.get('password2')?.markAsTouched();
      if (this.resetForm.errors?.['mismatch']) {
        this.errorMessage = 'Las contraseñas no coinciden';
      }
    }
  }
}
