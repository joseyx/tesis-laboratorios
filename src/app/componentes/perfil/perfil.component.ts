import { Component, inject, OnInit } from '@angular/core';
import { NgForOf, NgOptimizedImage } from '@angular/common';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  citas: any[] = [];
  user: any;

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas() {
    this.citasService.getCitas().subscribe({
      next: (citas: any) => {
        this.citas = citas;
        console.log('Citas fetched successfully', citas);
      },
      error: (error) => console.error('Error fetching citas', error)
    });
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
