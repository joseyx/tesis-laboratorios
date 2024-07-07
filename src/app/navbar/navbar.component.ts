import { Component } from '@angular/core';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { AboutComponent } from '../about/about.component';
import { FeaturesComponent } from '../features/features.component';
import  { ServiciosComponent } from '../servicios/servicios.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CarrouselComponent, AboutComponent, FeaturesComponent, ServiciosComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
