import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AxiosService } from './axios.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  async register(name: string, email: string, password: string) {
    const registerData = {
      name: name,
      email: email,
      password: password,
    };

    const response = await this.axiosService.post(
      'register',
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

    const response = await this.axiosService.post('login', loginData);
    const accessToken = response.data.jwt;

    if (accessToken) {
      this.storeAccessToken(accessToken);
    }

    return response.data;
  }

  async getUser() {
    const response = await this.axiosService.get('usuario');
    console.log(response.data);
    return response.data;
  }

  async logout() {
    const response = await this.axiosService.post('logout', {});
    this.cookieService.delete('accessToken');
    this.router.navigate(['/inicio']);
    return response.data;
  }

  async requestPasswordReset(email: string) {
    const resetData = { email };

    try {
      const response = await this.axiosService.post('request-reset-email', resetData);
      return response.data;
    } catch (error: unknown) {
      if ((error as any).response) {
        throw (error as any).response.data;
      } else {
        throw new Error('Error al enviar el correo electrónico de restablecimiento de contraseña');
      }
    }
  }

  async validateResetToken(uidb64: string, token: string) {
    try {
      const response = await this.axiosService.get(`password-reset/${uidb64}/${token}`);
      return response.data
    } catch (error) {
      return { message: 'Invalid or expired token' };
    }
  }

  async setNewPassword(uidb64: string, token: string, password: string) {
    const resetData = {
      uidb64: uidb64,
      token: token,
      password: password,
    };

    try {
      const response = await this.axiosService.patch('password-reset-complete', resetData);
      return response.data;
    } catch (error) {
      return { message: 'Error al reestablecer la contraseña' };
    }
  }

  private storeAccessToken(token: string): void {
    this.cookieService.set('accessToken', token, undefined, '/'); // Path for cookie access
  }

  private getAccessToken(): string | null {
    return this.cookieService.get('accessToken');
  }

  public getToken(): string | null {
    return this.getAccessToken();
  }

  isUserLoggedIn(): boolean {
    const accessToken = this.getAccessToken();
    console.log(!!accessToken);
    return !!accessToken;
  }
}
