import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { Router } from '@angular/router';
import { formatDateTime } from '../../helpers/helpers';
import { ModalConfirmarComponent } from '../../componentes/modal-confirmar/modal-confirmar.component';

@Component({
  selector: 'app-citas-table',
  standalone: true,
  imports: [NgFor, ModalConfirmarComponent, NgIf],
  templateUrl: './citas-table.component.html',
  styleUrl: './citas-table.component.scss'
})
export class CitasTableComponent implements OnInit {
  private citaService = inject(CitasService);
  private router = inject(Router);
  citas: any[] = [];
  showModal: boolean = false;
  modalMessage: string = '';
  citaToCancel: number | null = null;

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas(): void {
    this.citaService.getAllCitas().subscribe({
      next: (response) => {
        console.log('Citas fetched successfully', response); // Depuración
        this.citas = response;
        for (const cita of this.citas) {
          cita.date = formatDateTime(cita.date);
          cita.estado = this.capitalizeFirstLetter(cita.estado);
        }
      },
      error: (error) => console.error('Error fetching citas', error)
    });
  }

  editCita(id: number) {
    this.router.navigate(['/citas-edit', id]);
  }

  deleteCita(id: number) {
    const cita = this.citas.find(c => c.id === id);
    if (!cita) {
      console.error(`Cita con id ${id} no encontrada`);
      alert('Cita no encontrada');
      return;
    }

    this.showModal = true;
    this.modalMessage = '¿Estás seguro de que quieres eliminar esta cita?';
    this.citaToCancel = id;
  }

  onConfirm(result: boolean) {
    this.showModal = false;
    if (result && this.citaToCancel !== null) {
      console.log(`Cita con id ${this.citaToCancel} eliminada`);
      this.citaService.deleteCita(this.citaToCancel).subscribe({
        next: (response) => {
          console.log('Cita eliminada', response);
          this.getCitas();
          alert('Cita eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error eliminando cita', error);
          alert('Error eliminando cita');
        }
      });
      this.citaToCancel = null;
    }
  }

  verResultados(id: number) {
    const cita = this.citas.find(c => c.id === id);
    if (cita && cita.resultado) {
      window.open(cita.resultado, '_blank');
    } else {
      alert('No hay resultados disponibles para esta cita.');
    }
  }

  capitalizeFirstLetter(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
