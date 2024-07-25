import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { Router } from '@angular/router';

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
  citas: any[] = [];

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas() {
    this.citaService.getAllCitas()
    .then((citas: any) => {
      this.citas = citas;
      console.log('Citas fetched successfully', citas);
    })
    .catch((error: any) => {
      console.error('Error fetching citas', error);
    });
  }

  editCita(id: number) {
    this.router.navigate(['/citas-edit', id]);
  }

  deleteCita(id: any) {
    this.citaService.deleteCita(id)
    .then((response: any) => {
      console.log('Cita deleted successfully', response);
      this.getCitas();
    })
    .catch((error: any) => {
      console.error('Error deleting cita', error);
    });
  }
}
