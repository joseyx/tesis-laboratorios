import { Component } from '@angular/core';
import { CarrouselComponent } from '../carrousel/carrousel.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CarrouselComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
