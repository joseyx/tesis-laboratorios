import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.scss'
})
export class UsersCreateComponent {
  private userService = inject(UsuariosService);
  private router = inject(Router);

  user = {
    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
    role: ''
  };

  createUser() {
    this.userService.createUser(this.user).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        this.router.navigate(['users']);
      },
      error: (error) => console.error('Error creating user', error)
    })
  }
}
