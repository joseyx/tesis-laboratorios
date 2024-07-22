import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss'
})
export class UsersEditComponent {
  private router = inject(Router);

  updateUser() {
    console.log('Update user');
    this.router.navigate(['/users']);
  }
}
