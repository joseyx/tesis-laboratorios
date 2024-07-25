import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(
    private axiosService: AxiosService,
    private cookieService: CookieService
  ) {
  }

  async sendMessage(message: string) {
    const chatbotMessage = {
      message: message
    };

    const response = await this.axiosService.post(
      'chatbot/',
      chatbotMessage
    );

    return response.data;
  }

async getChatbotMessages() {
  const response = await this.axiosService.get('chat-messages/');

  return response.data;
  }
}
