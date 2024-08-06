import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-citas-edit',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgOptimizedImage],
  templateUrl: './citas-edit.component.html',
  styleUrl: './citas-edit.component.scss'
})
export class CitasEditComponent implements OnInit, AfterViewInit {
  cita: any = {
    date: '',
    estado: '',
  };

  errorMessage = '';
  successMessage = '';

  citaID!: number;
  minDate: string = '';

  constructor(
    private authService: AuthService,
    private citaService: CitasService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.citaID = +this.route.snapshot.paramMap.get('id')!;
      this.getCita(this.citaID);
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkAutofill();
    }, 100);
  }

  checkAutofill() {
    const dateInput = document.querySelector('input[name="date"]');
    const estadoInput = document.querySelector('input[name="estado"]');
    // @ts-ignore
    if (dateInput && (dateInput as HTMLInputElement).value) {
      dateInput.closest('.input-div')?.classList.add('focus');
    }
    // @ts-ignore
    if (estadoInput && (estadoInput as HTMLInputElement).value) {
      estadoInput.closest('.input-div')?.classList.add('focus');
    }
  }

  getCita(id: number) {
    this.citaService.getCitaID(id).subscribe({
      next: (cita: any) => {
        this.cita.date = cita.date;
        this.cita.estado = cita.estado;
        console.log('Cita fetched succssfully', cita);
      },
      error: (error) => console.log('There was an error!', error)
    })
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      console.log('Cita to update:', this.cita); // Verifica que los datos sean correctos
      try {
        const response = await this.citaService.updateCita(this.citaID, this.cita).toPromise();
        console.log('Cita updated successfully', response);
        this.successMessage = 'Cita actualizada exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/citas-table']);
        }, 2000);
      } catch (error: unknown) {
        console.error('Error updating cita', error);

        // Manejo de errores de tipo unknown
        if (error instanceof Error) {
          // Esto es una instancia de Error estándar
          if (error.message) {
            this.errorMessage = error.message;
          } else {
            this.errorMessage = 'Error en la actualización. Por favor, inténtalo de nuevo más tarde.';
          }
        } else {
          // Manejo para otros tipos de error
          this.errorMessage = 'Error en la actualización. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
