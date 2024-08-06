import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AxiosService } from './axios.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CreateCitaInterface } from '../utils/interfaces';

const baseUrl = 'http://localhost:8080/api/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private http = inject(HttpClient)
  private authService = inject(AuthService);

  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService,
  ) { }

  async getCitas() {
    const response = await this.axiosService.get('citas/list');
    return response.data;
  }

  getCitaID(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllCitas(): Observable<any> {
    return this.http.get<any[]>(`${baseUrl}/list/all`, {
      headers: this.getAuthHeaders()
    });
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
    return this.http.patch(`${baseUrl}/${id}`, cita, {
      headers: this.getAuthHeaders()
    });
  }

  deleteCita(id: any): Observable<any> {
    const url = `${baseUrl}/${id}`;
    console.log(`Eliminando cita con URL: ${url}`);
    return this.http.delete(url, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }
}
