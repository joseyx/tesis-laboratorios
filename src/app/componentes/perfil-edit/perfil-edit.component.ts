import { AuthService } from './../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil-edit.component.html',
  styleUrl: './perfil-edit.component.scss'
})
export class PerfilEditComponent {
  private userService = inject(UsuariosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  user: any = {
    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
  };

  userID!: number;

  ngOnInit(): void {
    this.userID = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser(this.userID);
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (user: any) => {
        this.user = user;
        console.log('User fetched successfully', user);
      },
      error: (error) => console.error('Error fetching user', error)
    });
  }

  editUser() {
    this.userService.updateUser(this.userID, this.user).subscribe({
      next: (response) => {
        console.log('User updated successfully', response);
        this.router.navigate(['perfil']); // Redirige al perfil del usuario o donde quieras
      },
      error: (error) => console.error('Error updating user', error)
    });
  }
}
