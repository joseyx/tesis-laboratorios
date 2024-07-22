import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private http = inject(HttpClient)
  constructor() { }

  getCitas(): Observable<any> {
    return this.http.get(`${baseUrl}/list`);
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

  updateCita(id: any, cita: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, cita);
  }

  deleteCita(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
