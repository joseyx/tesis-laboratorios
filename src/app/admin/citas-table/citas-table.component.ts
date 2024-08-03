import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { Router } from '@angular/router';
import { CitaInterface } from '../../utils/interfaces';
import { formatDateTime } from '../../helpers/helpers';

@Component({
  selector: 'app-citas-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './citas-table.component.html',
  styleUrl: './citas-table.component.scss'
})
export class CitasTableComponent {
  private citaService = inject(CitasService);
  private router = inject(Router);
  citas: CitaInterface[] = [];

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas() {
    const response = this.citaService.getAllCitas();
    response.then((citas) => {
      this.citas = citas;
    });
    // for loop through citas
    for (let cita of this.citas) {
      cita.date = formatDateTime(cita.date);
      cita.estado = cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1);
    }
  }

  editCita(id: number) {
    this.router.navigate(['/citas-edit', id]);
  }

  protected readonly formatDateTime = formatDateTime;
}
