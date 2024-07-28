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
  // users = [
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'admin' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'medico' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'medico' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'user' },
  //   { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'user' },
  // ]
  private userService = inject(UsuariosService);
  private router = inject(Router);
  users: any[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users;
        console.log('Users fetched successfully', users);
      },
      error: (error) => console.error('Error fetching users', error)
    });
  }

  createUser(){
    this.router.navigate(['users-create']);
  }

  editUser(id: number) {
    this.router.navigate(['/users-edit', id]);
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
        console.log('User deleted successfully');
      },
      error: (error) => console.error('Error deleting user', error)
    })
  }

  capitalizeFirstLetter(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
