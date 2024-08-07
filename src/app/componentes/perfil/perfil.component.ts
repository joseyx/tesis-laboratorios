import { Component, inject, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserInterface, CitaInterface } from '../../utils/interfaces';
import { formatDateTime } from '../../helpers/helpers';
import { ModalConfirmarComponent } from '../modal-confirmar/modal-confirmar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    ModalConfirmarComponent,
    NgIf
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
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
  showModal: boolean = false;
  modalMessage: string = '';
  citaToCancel: number | null = null;

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
        cita.estado = cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1);
      }

    } catch (error) {
      console.error('Error fetching citas', error);
    }
  }

  loadUser() {
    this.authService.getUser().then(user => {
      this.user = user;
      this.user.role = this.user.role.charAt(0).toUpperCase() + this.user.role.slice(1);
      console.log('User fetched successfully', user);
    }).catch(error => {
      console.error('Error fetching user', error);
    });
  }

  editPerfil() {
    const userID = this.user.id;
    this.router.navigate(['/perfil-edit', userID]);
  }

  cancelCita(id: number) {
    this.showModal = true;
    this.modalMessage = '¿Estás seguro de que deseas cancelar la cita?';
    this.citaToCancel = id;
  }

  onConfirm(result: boolean) {
    this.showModal = false;
    if (result && this.citaToCancel !== null) {
      console.log(`Cita con id ${this.citaToCancel} cancelada`);
      this.citasService.deleteCita(this.citaToCancel).subscribe({
        next: (response) => {
          console.log('Cita cancelada', response);
          alert('Cita cancelada exitosamente');
          this.getCitas();
        },
        error: (error) => {
          console.error('Error canceling cita', error);
          alert('Error cancelando cita');
        }
      });
      this.citaToCancel = null;
    }
  }
}
