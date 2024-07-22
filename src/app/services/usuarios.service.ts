import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient)
  constructor() { }

  getUsers() {
    return this.http.get(baseUrl);
  }

}
