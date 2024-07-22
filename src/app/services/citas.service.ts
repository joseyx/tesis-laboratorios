import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private http = inject(HttpClient)
  constructor() { }

  getCitas() {
    return this.http.get(`${baseUrl}/list`);
  }
}
