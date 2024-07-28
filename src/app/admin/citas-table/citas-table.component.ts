import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
    this.citaService.getAllCitas().subscribe({
      next: (citas: any) => {
        this.citas = citas;
        console.log('Citas fetched successfully', citas);
      },
      error: (error) => console.error('Error fetching citas', error)
    });
  }

  editCita(id: number) {
    this.router.navigate(['/citas-edit', id]);
  }

  deleteCita(id: number) {
    this.citaService.deleteCita(id).subscribe({
      next: () => {
        this.citas = this.citas.filter(cita => cita.id !== id);
        console.log('Cita deleted successfully');
      },
      error: (error) => console.error('Error deleting cita', error)
    });
  }

  capitalizeFirstLetter(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
