import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(private router: Router) {}

  async scrollToElementId(elementId: string) {
    // Navega a la ruta que contiene el componente B
    await this.router.navigate(['inicio']);

    // Espera un pequeño retraso para asegurarte de que el componente está completamente cargado
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Puedes ajustar el retraso según sea necesario
  }
}
