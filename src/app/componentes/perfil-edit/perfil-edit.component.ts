import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [],
  templateUrl: './perfil-edit.component.html',
  styleUrl: './perfil-edit.component.scss'
})
export class PerfilEditComponent {
  private router = inject(Router);

  editUser() {
    console.log('Edit user');
    this.router.navigate(['/perfil']);
  }
}
