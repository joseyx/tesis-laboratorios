import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { CitaInterface } from '../../utils/interfaces';
import { formatDateToInputValue } from '../../helpers/helpers';

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
    resultado: '',
  };

  selectedFile: File | null = null;
  errorMessage = '';
  successMessage = '';

  citaID!: number;
  minDate: string = '';

  constructor(
    private authService: AuthService,
    private citaService: CitasService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
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

  async getCita(id: number) {
    const response = await this.citaService.getCitaID(id);

    this.cita = response.data;
    this.cita.date = formatDateToInputValue(this.cita.date);
    console.log('Cita fetched successfully', this.cita);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // async onSubmit(form: NgForm): Promise<void> {
  //   if (form.valid) {
  //     console.log('Cita to update:', this.cita); // Verifica que los datos sean correctos
  //     try {
  //       const response = await this.citaService.updateCita(this.citaID, this.cita).toPromise();
  //       console.log('Cita updated successfully', response);
  //       this.successMessage = 'Cita actualizada exitosamente.';
  //       setTimeout(() => {
  //         this.router.navigate(['/citas-table']);
  //       }, 2000);
  //     } catch (error: unknown) {
  //       console.error('Error updating cita', error);

  //       // Manejo de errores de tipo unknown
  //       if (error instanceof Error) {
  //         // Esto es una instancia de Error estándar
  //         if (error.message) {
  //           this.errorMessage = error.message;
  //         } else {
  //           this.errorMessage = 'Error en la actualización. Por favor, inténtalo de nuevo más tarde.';
  //         }
  //       } else {
  //         // Manejo para otros tipos de error
  //         this.errorMessage = 'Error en la actualización. Por favor, inténtalo de nuevo más tarde.';
  //       }
  //     }
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      console.log('Cita to update:', this.cita); // Verifica que los datos sean correctos
      try {
        if (this.selectedFile) {
          const filePath = `resultados/${this.selectedFile.name}`;
          const fileRef = ref(this.storage, filePath);
          await uploadBytes(fileRef, this.selectedFile);
          const fileUrl = await getDownloadURL(fileRef);
          console.log('File URL:', fileUrl); // Depuración
          this.cita.resultado = fileUrl;
        }

        console.log('Cita to update:', this.cita); // Depuración
        const response = await this.citaService.updateCita(this.citaID, this.cita).toPromise();
        console.log('Cita updated successfully', response); // Depuración
        this.successMessage = 'Cita actualizada exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/citas-table']);
        }, 2000);
      } catch (error: unknown) {
        console.error('Error updating cita', error);

        if (error instanceof Error && error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Error en la actualización. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    } else {
      console.log('Form is invalid');
    }
  }

  // uploadFile($event: any) {
  //   const file = $event.target.files[0];
  //   console.log('File selected:', file);

  //   const filePath = ref(this.storage, `resultados/${file.name}`);

  //   uploadBytes(filePath, file)
  //   .then(response => console.log('File uploaded successfully', response, this.successMessage = 'Archivo subido exitosamente'))
  //   .catch(error => console.error('Error uploading file', error, this.errorMessage = 'Error al subir el archivo'));
  // }
}
