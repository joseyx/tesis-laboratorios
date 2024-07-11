import { Component } from '@angular/core';
import { AboutComponent } from '../../componentes/about/about.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    AboutComponent
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {

}
