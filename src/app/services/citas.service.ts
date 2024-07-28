import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AxiosService } from './axios.service';
import { Observable } from 'rxjs';
import { CreateCitaInterface } from '../utils/interfaces';

const baseUrl = 'http://localhost:8080/api/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private http = inject(HttpClient)
  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService
  ) { }

  async getCitas() {
    const response = await this.axiosService.get('citas/list');
    return response.data;
  }

  getCitaID(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getAllCitas(): Observable<any> {
    return this.http.get(`${baseUrl}/list/all`);
  }

  createCita(cita: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(baseUrl, cita, { headers });
  }

  async axiosCreateCita(cita: CreateCitaInterface) {
    const response = await this.axiosService.post('citas', cita);
    return response.data;
  }

  updateCita(id: any, cita: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, cita);
  }

  deleteCita(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
