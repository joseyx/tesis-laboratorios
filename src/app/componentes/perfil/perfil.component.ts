import { Component, inject, OnInit } from '@angular/core';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface, CitaInterface } from '../../utils/interfaces';
import { formatDateTime } from '../../helpers/helpers';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  // citas = [
  //   { fecha: '2024-07-01', tipo: 'Examen de Sangre', estado: 'Completada' },
  //   { fecha: '2024-07-15', tipo: 'Análisis de Orina', estado: 'Pendiente' },
  //   { fecha: '2024-07-20', tipo: 'Prueba de Alergia', estado: 'Cancelada' },
  //   { fecha: '2024-07-25', tipo: 'Control General', estado: 'Pendiente' },
  // ];
  private citasService = inject(CitasService);
  private authService = inject(AuthService);
  private router = inject(Router);
  citas: CitaInterface[] = [];
  user: UserInterface = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    image: '',
    role: ''
  };

  ngOnInit(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.loadUser();
    this.getCitas().then(r => console.log('Citas fetched successfully', r));
  }

  async getCitas() {
    try {
      const response = this.citasService.getCitas();
      this.citas = await response;
      for (const cita of this.citas) {
        cita.date = formatDateTime(cita.date);
      }

    } catch (error) {
      console.error('Error fetching citas', error);
    }
  }

  loadUser() {
    this.authService.getUser().then(user => {
      this.user = user;
      console.log('User fetched successfully', user);
    }).catch(error => {
      console.error('Error fetching user', error);
    });
  }

  editPerfil() {
    const userID = this.user.id;
    this.router.navigate(['/perfil-edit', userID]);
  }
}
