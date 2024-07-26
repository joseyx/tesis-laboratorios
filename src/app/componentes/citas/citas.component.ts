import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { CreateCitaInterface } from '../../utils/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  cita: CreateCitaInterface = {
    date: new Date(),
    description: ''
  }
  constructor(private authService: AuthService,
              private citasService: CitasService,
              private router: Router) {}

  ngOnInit(): void {
    // scroll to top
    window.scrollTo(0, 0);
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']).then(r => console.log(r));
    }
  }

  async onSubmit(): Promise<void> {
    try {
      const response = await this.citasService.axiosCreateCita(this.cita);
      console.log('Cita creada exitosamente', response);
      // Aquí puedes manejar la respuesta como redirigir o mostrar un mensaje de éxito
      // redirect to perfil
      await this.router.navigate(['/perfil']);
    } catch (error) {
      console.error('Error al crear la cita', error);
      // Aquí puedes manejar el error como mostrar un mensaje de error
    }
  }
}
