import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService
  ) {
  }

  async register(name: string, email: string, password: string) {
    const registerData = {
      name: name,
      email: email,
      password: password,
    };

    const response = await this.axiosService.post(
      'auth/register',
      registerData
    );
    const accessToken = response.data.token;

    if (accessToken) {
      this.storeAccessToken(accessToken);
    }

    return response.data;
  }

  async login(email: string, password: string) {
    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);

    const response = await this.axiosService.post('auth/login', loginData);
    const accessToken = response.data.token;

    if (accessToken) {
      this.storeAccessToken(accessToken);
    }

    return response.data;
  }

  async getUser() {
    const response = await this.axiosService.get('auth/user');
    return response.data;
  }

  async logout() {
    const response = await this.axiosService.post('auth/logout', {});
    console.log(response);
    this.cookieService.delete('accessToken');
    console.log(this.getAccessToken());
    return response.data;
  }

  // async forgotPassword(email: string) {
  //   const forgotData = {
  //     email: email,
  //   };
  //   try {
  //     const response = await this.axiosService.post(
  //       'auth/forgotPassword',
  //       forgotData
  //     );
  //     return response.data;
  //   } catch (error) {
  //     return { message: 'Error sending reset link.' };
  //   }
  // }

  // async resetPassword(
  //   token: string,
  //   email: string,
  //   password: string,
  //   confirmPassword: string
  // ) {
  //   const resetData = {
  //     token: token,
  //     email: email,
  //     password: password,
  //     confirmPassword: confirmPassword,
  //   };
  //   try {
  //     const response = await this.axiosService.post(
  //       'auth/resetPassword',
  //       resetData
  //     );
  //     return response.data;
  //   } catch (error) {
  //     return { message: 'Error resetting password.' };
  //   }
  // }

  private storeAccessToken(token: string): void {
    this.cookieService.set('accessToken', token, undefined, '/'); // Path for cookie access
  }

  private getAccessToken(): string | null {
    return this.cookieService.get('accessToken');
  }

  isUserLoggedIn(): boolean {
    const accessToken = this.getAccessToken();
    console.log(!!accessToken);
    return !!accessToken;
  }
}
