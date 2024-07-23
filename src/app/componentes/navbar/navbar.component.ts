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
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

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
    RouterOutlet,
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected isLoggedIn: boolean = false;
  name: string | undefined;
  isAdmin: boolean = false;
  constructor(private authService: AuthService, ) {
  }

  async ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.getUser().then((data) => {
      this.name = data.name;
      if (data.rol == 'Admin') {
        this.isAdmin = true;
      }
    });
  }

  async logout() {
    try {
      const response = await this.authService.logout();
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
