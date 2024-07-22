import { Component, OnInit } from '@angular/core';
import { NgForOf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  citas = [
    { fecha: '2024-07-01', tipo: 'Examen de Sangre', estado: 'Completada' },
    { fecha: '2024-07-15', tipo: 'Análisis de Orina', estado: 'Pendiente' },
    { fecha: '2024-07-20', tipo: 'Prueba de Alergia', estado: 'Cancelada' },
    { fecha: '2024-07-25', tipo: 'Control General', estado: 'Pendiente' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
