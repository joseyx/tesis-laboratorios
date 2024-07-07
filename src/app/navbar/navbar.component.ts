import { Component } from '@angular/core';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CarrouselComponent, AboutComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
