import { Component } from '@angular/core';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { AboutComponent } from '../about/about.component';
import { FeaturesComponent } from '../features/features.component';
import { ServiciosComponent } from '../servicios/servicios.component';
import { CitasComponent } from '../citas/citas.component';
import { TestimoniosComponent } from '../testimonios/testimonios.component';
import { FooterComponent } from '../footer/footer.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CarrouselComponent,
    AboutComponent,
    FeaturesComponent,
    ServiciosComponent,
    CitasComponent,
    TestimoniosComponent,
    FooterComponent,
    PerfilComponent,
    ChatbotComponent,
    RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
