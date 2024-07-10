import { Component } from '@angular/core';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { AboutComponent } from '../about/about.component';
import { FeaturesComponent } from '../features/features.component';
import  { ServiciosComponent } from '../servicios/servicios.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { TestimoniosComponent } from '../testimonios/testimonios.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CarrouselComponent, AboutComponent, FeaturesComponent, ServiciosComponent, ChatbotComponent, TestimoniosComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
