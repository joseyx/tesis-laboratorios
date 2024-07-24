import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage, NgIf],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})
export class CitasComponent {
  cita: any ={
    date: '',
    service: '',
  }
  successMessage= '';
  errorMessage = '';

  constructor(private citasService: CitasService, private router: Router) {}

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      try {
        const response = await this.citasService.createCita(this.cita);
        console.log('Cita creada', response);
        this.router.navigate(['/perfil']); // Redirect to the main page or where you need
      } catch (error) {
        console.error('Error al crear la cita', error);
        // Handle the login error here
        // @ts-ignore
        if (error.response && error.response.data && error.response.data.detail === 'Cita not created') {
          this.errorMessage = 'Cita no creada. Por favor, verifica la fecha y el servicio.';
        } else {
          this.errorMessage = 'Error al crear la cita. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
