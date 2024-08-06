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
export class RequestPasswordResetComponent {
  resetForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    if (this.resetForm.valid) {
      this.authService.requestPasswordReset(this.resetForm.value.email).then(
        response => {
          this.message = response.success;
          this.error = '';
        },
        error => {
          this.error = error.error;
          this.message = '';
        }
      );
    } else {
      this.resetForm.get('email')?.markAsTouched();
    }
  }
}
