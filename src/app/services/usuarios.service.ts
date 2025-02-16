import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../utils/interfaces';
import { AxiosService } from './axios.service';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient)
  constructor(
        private axiosService: AxiosService,
  ) { }

  // getUsers(): Observable<any> {
  //   return this.http.get(baseUrl);
  // }
  async getUsers() {
    const response = await this.axiosService.get('users');
    return response.data;
  }


  // getUser(id: number): Observable<any> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }
  async getUser(id: number) {
    const response = await this.axiosService.get(`users/${id}`);
    return response.data;
  }

  // createUser(user: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(baseUrl, user, { headers });
  // }
  async createUser(user: UserInterface) {
    const response = await this.axiosService.post('users', user);
    return response.data;
  }

  async updateUser(user: UserInterface) {
    const response = await this.axiosService.patch(`users/${user.id}`, user);
    return response.data;
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
