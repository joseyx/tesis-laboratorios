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
  message: string = '';
  token: string = '';
  uidb64: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.uidb64 = this.route.snapshot.params['uidb64'];
    console.log('Token:', this.token);
    console.log('Uidb64:', this.uidb64);
  }

  async onSubmit() {
    if (this.resetForm.valid) {
      const password = this.resetForm.value.password;
      console.log('Password:', password);
      console.log('Token:', this.token);
      console.log('UIDB64:', this.uidb64);
      const response = await this.authService.setNewPassword(this.uidb64, this.token, password);
      if (response.success) {
        this.message = 'Contraseña reestablecida correctamente';
      } else {
        this.message = response.message || 'Error al reestablecer la contraseña';
      }
    }
  }
}
