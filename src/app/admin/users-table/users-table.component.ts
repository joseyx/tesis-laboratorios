import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  private userService = inject(UsuariosService);
  private router = inject(Router);
  users: any[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllusers()
    .then((users: any) => {
      this.users = users;
      console.log('Users fetched successfully', users);
    })
    .catch((error: any) => {
      console.error('Error fetching users', error);
    })
  }

  createUser(){
    this.router.navigate(['users-create']);
  }

  editUser(id: any) {
    this.router.navigate(['users-edit', id]);
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id)
    .then((response: any) => {
      console.log('User deleted successfully', response);
      this.getUsers();
    })
    .catch((error: any) => {
      console.error('Error deleting user', error);
    });
  }
}
