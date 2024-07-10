import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: NavbarComponent},
  {path: 'chatbot', component: ChatbotComponent}
];
