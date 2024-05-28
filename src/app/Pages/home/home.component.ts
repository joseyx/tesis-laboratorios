import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, DropdownModule, ButtonModule, SplitButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  user: MenuItem[] = [];

  userLogIn: boolean = true;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = [
      {
        label: 'Editar perfil',
        icon: 'pi pi-user-edit',
        command: () => { this.router.navigate(['/edit-profile']); }
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-times',
        command: () => { this.router.navigate(['/']); }
      }
    ];
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
