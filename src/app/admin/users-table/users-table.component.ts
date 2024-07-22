import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';

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
  // users = [
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'admin' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'medico' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'medico' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'user' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'user' },
  // ]
  private usersService = inject(UsuariosService);
  users: any[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users;
        console.log('Users fetched successfully', users);
      },
      error: (error) => console.error('Error fetching users', error)
    });
  }

  createUser(){
    console.log('Create user');
  }

  editUser(id: any) {
    console.log('Edit user');
  }

  deleteUser(id: any) {
    console.log('Delete user');
  }
}
