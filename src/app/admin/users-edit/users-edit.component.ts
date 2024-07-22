import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss'
})
export class UsersEditComponent {
  private userService = inject(UsuariosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user: any = {
    image: '',
    role: '',
  };

  userID!: number;

  ngOnInit(): void {
    this.userID = +this.route.snapshot.paramMap.get('id')!;
    this.getUser(this.userID);
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (user: any) => {
        this.user = user;
        console.log('User fetched succssfully', user);
      },
      error: (error) => console.error('There was an error!', error)
    })
  }

  updateUser() {
    this.userService.updateUser(this.userID, this.user).subscribe({
      next: (response) => {
        console.log('User updated successfully!', response);
        this.router.navigate(['/users']);
      },
      error: (error) => console.error('There was an error!', error)
    })
  }
}
