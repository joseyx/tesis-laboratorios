import { AfterViewInit, Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { ChatbotComponent } from '../../componentes/chatbot/chatbot.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { CarrouselComponent } from '../../componentes/carrousel/carrousel.component';
import { FeaturesComponent } from '../../componentes/features/features.component';
import { ServiciosComponent } from '../../componentes/servicios/servicios.component';
import { TestimoniosComponent } from '../../componentes/testimonios/testimonios.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    ChatbotComponent,
    FooterComponent,
    CarrouselComponent,
    FeaturesComponent,
    ServiciosComponent,
    TestimoniosComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements AfterViewInit {
  @ViewChild('about') about!: ElementRef;
  @ViewChild('servicios') servicios!: ElementRef;
  @ViewChild('testimonios') testimonios!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    // Este método se asegura de que el elemento está listo
    this.scrollToElement();
  }

  scrollToElement() {
    const element = this.about.nativeElement;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
