import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

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
  users = [
    { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'admin' },
    { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'medico' },
    { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'medico' },
    { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'user' },
    { name: 'Jose', email: 'jose@jose.com', phone: '123456789', image: '../../assets/img/avatar.svg', role: 'user' },
  ]

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
