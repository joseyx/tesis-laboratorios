import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { Error404Component } from './componentes/error404/error404.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CitasPageComponent } from './pages/citas-page/citas-page.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsersTableComponent } from './admin/users-table/users-table.component';
import { UsersCreateComponent } from './admin/users-create/users-create.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'about',
        component: AboutPageComponent
      },
      {
        path: 'citas',
        component: CitasPageComponent
      },
      {
        path: 'perfil',
        component: PerfilPageComponent
      },
      {
        path: 'users',
        component: UsersTableComponent
      },
      {
        path: 'users-create',
        component: UsersCreateComponent
      },
      {
        path: '**',
        component: Error404Component
      }
    ]
  },
  {path: '**', component: Error404Component}
];
