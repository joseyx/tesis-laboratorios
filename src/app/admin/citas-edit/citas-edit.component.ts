import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
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
    status: '',
  };

  errorMessage = '';
  successMessage = '';

  citaID!: number;
  minDate: string = '';

  constructor(
    private userService: UsuariosService,
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
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
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
    const statusInput = document.querySelector('input[name="status"]');
    // @ts-ignore
    if (dateInput && (dateInput as HTMLInputElement).value) {
      dateInput.closest('.input-div')?.classList.add('focus');
    }
    // @ts-ignore
    if (statusInput && (statusInput as HTMLInputElement).value) {
      statusInput.closest('.input-div')?.classList.add('focus');
    }
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

  // updateCita() {
  //   this.citaService.updateCita(this.citaID, this.cita).subscribe({
  //     next: (response) => {
  //       console.log('Cita updated successfully!', response);
  //       this.router.navigate(['/citas-table']);
  //     },
  //     error: (error) => console.log('There was an error!', error)
  //   })
  // }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      try {
        const response = await this.citaService.updateCita(this.citaID, this.cita);
        console.log('Cita updated successfully', response);
        this.successMessage = 'Cita actualizada exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/citas-table']);
        }, 2000);
      } catch (error) {
        console.error('Error updating user', error);
        // @ts-ignore
        if (error.response && error.response.data) {
          // @ts-ignore
          if (error.response.data.error === 'Date not valid') {
            this.errorMessage = 'Seleccione una fecha válida.';
          } else {
            // @ts-ignore
            this.errorMessage = error.response.data.detail || 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
          }
        } else {
          this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    } else {
      console.log('Form is invalid or passwords do not match');
    }
  }
}
