import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { ModalConfirmarComponent } from '../../componentes/modal-confirmar/modal-confirmar.component';
import { UserInterface } from '../../utils/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ModalConfirmarComponent,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  private userService = inject(UsuariosService);
  private router = inject(Router);
  private authService = inject(AuthService);
  users: any[] = [];
  loggedUser:UserInterface = {
    id: 0,
    name: '',
    email: '',
    role: '',
    image: '',
    phone: '',
  };
  showModal: boolean = false;
  modalMessage: string = '';
  userToCancel: number | null = null;

  ngOnInit(): void {
    this.getUsers();
    this.getUser();
  }

  getUsers() {
    const response = this.userService.getUsers()
    response.then((users) => {
      this.users = users;
    }).catch((error) => {
      console.error('Error fetching users', error);
    });
  }

  async getUser() {
    const response = await this.authService.getUser()
    console.log('User fetched', response);
    this.loggedUser = response;
  }

  createUser(){
    this.router.navigate(['users-create']);
  }

  editUser(id: number) {
    this.router.navigate(['/users-edit', id]);
  }

  deleteUser(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      console.error(`Usuario con id ${id} no encontrado`);
      alert('Usuario no encontrado');
      return;
    }

    this.showModal = true;
    this.modalMessage = '¿Estás seguro de que quieres eliminar este usuario?';
    this.userToCancel = id;
  }

  onConfirm(result: boolean) {
    this.showModal = false;
    if (result && this.userToCancel !== null) {
      console.log(`Usuario con id ${this.userToCancel} eliminado`);
      this.userService.deleteUser(this.userToCancel).subscribe({
        next: (response) => {
          console.log('Usuario eliminado', response);
          this.getUsers();
          alert('Usuario eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error eliminando usuario', error);
          alert('Error eliminando usuario');
        }
      });
      this.userToCancel = null;
    }
  }

  capitalizeFirstLetter(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
