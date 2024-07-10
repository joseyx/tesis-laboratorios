import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { Error404Component } from './error404/error404.component';
import { TestimoniosComponent } from './testimonios/testimonios.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: NavbarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'chatbot', component: ChatbotComponent},
  {path: 'testimonios', component: TestimoniosComponent},
  {path: '**', component: Error404Component}
];
