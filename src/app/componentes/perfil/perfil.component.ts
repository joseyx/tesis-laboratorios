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
  private citaService = inject(CitasService);
  private authService = inject(AuthService);
  private router = inject(Router);
  citas: any[] = [];
  user: any;

  ngOnInit(): void {
    this.getCitas();
    this.loadUser();
  }

  getCitas() {
    this.citaService.getPersonalCitas()
    .then((citas: any) => {
      this.citas = citas;
      console.log('Citas fetched successfully', citas);
    })
    .catch((error: any) => {
      console.error('Error fetching citas', error);
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
    if (!this.user) {
      console.error('User is not loaded yet');
      return;
    }
    const userID = this.user.id;
    this.router.navigate(['/perfil-edit', userID]);
  }
}
