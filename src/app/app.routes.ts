import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { LoginComponent } from './Pages/login/login.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio'},
  { path: 'home', component: HomeComponent, title: 'Inicio'},
  { path: 'profile', component: ProfileComponent, title: 'Perfil'},
  { path: 'edit-profile', component: EditProfileComponent, title: 'Editar Perfil'},
  { path: 'login', component: LoginComponent, title: 'Iniciar sesión'},
  { path: 'register', component: RegisterComponent, title: 'Registrar usuario'},
];
