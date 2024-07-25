import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService
  ) {
  }

  // async login(email: string, password: string) {
  //   const loginData = {
  //     email: email,
  //     password: password,
  //   };
  //   console.log(loginData);

  //   const response = await this.axiosService.post('auth/login', loginData);
  //   const accessToken = response.data.token;

  //   if (accessToken) {
  //     this.storeAccessToken(accessToken);
  //   }

  //   return response.data;
  // }

  // async getUser() {
  //   const response = await this.axiosService.get('auth/user');
  //   return response.data;
  // }

  // async logout() {
  //   const response = await this.axiosService.post('auth/logout', {});
  //   console.log(response);
  //   this.cookieService.delete('accessToken');
  //   console.log(this.getAccessToken());
  //   return response.data;
  // }

  async getAllusers() {
    const response = await this.axiosService.get(
      'users',
    )

    return response.data;
  }

  async getUserID(id: any) {
    const response = await this.axiosService.get(
      `users/${id}`,
    )

    return response.data;
  }

  async createUser(user: any) {
    const response = await this.axiosService.post(
      'users/',
      user
    )

    return response.data;
  }

  async updateUser(id: any, user: any) {
    const response = await this.axiosService.post(
      `users/${id}`,
      user
    )

    return response.data;
  }

  async deleteUser(id: any) {
    const response = await this.axiosService.delete(
      `users/${id}`,
    )

    return response.data;
  }

  // private storeAccessToken(token: string): void {
  //   this.cookieService.set('accessToken', token, undefined, '/'); // Path for cookie access
  // }

  // private getAccessToken(): string | null {
  //   return this.cookieService.get('accessToken');
  // }

  // isUserLoggedIn(): boolean {
  //   const accessToken = this.getAccessToken();
  //   console.log(!!accessToken);
  //   return !!accessToken;
  // }
}
