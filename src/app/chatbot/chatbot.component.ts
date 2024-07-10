import { Component, HostBinding, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../services/chatbot.service';
import { AutoResizeDirective } from '../utils/auto-resize.directive';

interface Message {
  text: string;
  sender: 'user' | 'model';
  error?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [MatIconModule, NgClass, FormsModule, NgForOf, NgIf, AutoResizeDirective],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChatbotComponent implements OnInit, AfterViewChecked{

  @HostBinding('class.show-chatbot') isChatbotVisible = false;
  @ViewChild('chatbox') chatbox!: ElementRef;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private chatbotService: ChatbotService
  ) {}

  ngOnInit() {
    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  messages: Message[] = [
    { text: 'Hola, soy el chatbot de TesisLaboratorios. ¿En qué puedo ayudarte?', sender: 'model' }
  ];
  newMessage: string = '';

  async addMessage() {
    if (this.newMessage.trim()) {
      // Añade el mensaje del usuario a la lista
      this.messages.push({ text: this.newMessage, sender: 'user' });

      // Guarda el mensaje y limpia el campo de entrada
      const userMessage = this.newMessage;
      this.newMessage = '';

      setTimeout(() => this.scrollToBottom(), 0);

      // Envía el mensaje al servicio del chatbot y maneja la respuesta
      try {
        const botResponse = await this.chatbotService.sendMessage(userMessage);
        this.messages.push({ text: botResponse.response, sender: 'model' });
        setTimeout(() => this.scrollToBottom(), 0);
      } catch (error) {
        this.messages.push({ text: 'Lo siento, no pude procesar tu mensaje', sender: 'model', error: true });
        console.error('Error al enviar mensaje al chatbot', error);
      }
    }
  }

  ngAfterViewChecked() {
    // Scroll to the bottom when the view has been checked
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Error al hacer scroll', err);
    }
  }

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // If Shift + Enter, add a new line
        const textarea = event.target as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Insert a newline character at the current cursor position
        this.newMessage = this.newMessage.substring(0, start) + '\n' + this.newMessage.substring(end);

        // Set the cursor position after the newline character
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);

        // Prevent default behavior to avoid adding another new line
        event.preventDefault();
      } else {
        // Prevent the default behavior of Enter
        event.preventDefault();
        // If only Enter, send the message
        this.addMessage().then(r => {});
      }
    }
  }

}
