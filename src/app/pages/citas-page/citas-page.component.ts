import { Component } from '@angular/core';
import { CitasComponent } from '../../componentes/citas/citas.component';

@Component({
  selector: 'app-citas-page',
  standalone: true,
  imports: [
    CitasComponent
  ],
  templateUrl: './citas-page.component.html',
  styleUrl: './citas-page.component.scss'
})
export class CitasPageComponent {

}
