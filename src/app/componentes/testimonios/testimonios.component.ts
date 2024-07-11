import { AfterViewInit, Component } from '@angular/core';
import 'owl.carousel';

import { NgOptimizedImage } from '@angular/common';


declare var $: any;

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './testimonios.component.html',
  styleUrl: './testimonios.component.scss'
})
export class TestimoniosComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    ($('.testimonial-carousel') as any).owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      items: 1,
      loop: true,
      dots: false,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>'
      ]
    });
  }
}
