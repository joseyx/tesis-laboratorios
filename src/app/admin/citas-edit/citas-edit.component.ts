import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citas-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './citas-edit.component.html',
  styleUrl: './citas-edit.component.scss'
})
export class CitasEditComponent {
  private citaService = inject(CitasService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cita: any = {
    date: '',
    status: '',
  };

  citaID!: number;

  ngOnInit(): void {
    this.citaID = +this.route.snapshot.paramMap.get('id')!;
    this.getCita(this.citaID);
  }

  getCita(id: number) {
    this.citaService.getCitaID(id).subscribe({
      next: (cita: any) => {
        this.cita = cita;
        console.log('Cita fetched succssfully', cita);
      },
      error: (error) => console.log('There was an error!', error)
    })
  }

  updateCita() {
    this.citaService.updateCita(this.citaID, this.cita).subscribe({
      next: (response) => {
        console.log('Cita updated successfully!', response);
        this.router.navigate(['/citas-table']);
      },
      error: (error) => console.log('There was an error!', error)
    })
  }
}
