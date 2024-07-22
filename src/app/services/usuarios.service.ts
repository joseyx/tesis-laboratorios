import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient)
  constructor() { }

  getUsers(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(baseUrl, user, { headers });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
