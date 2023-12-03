import { Route } from '@angular/router';
import { ClientCrudComponent } from './client/crud/client-crud.component';
import { MainComponent } from './main/main.component';
import { UsuariosListaComponent } from './usuarios/lista/usuarios-lista.component';
import { ClientListaComponent } from './client/lista/client-lista.component';
import { AuthGuard } from './auth/auth.guard';
import { SigninComponent } from './signin/signin.component';

export const routes: Array<Route> = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cliente',
        component: ClientListaComponent,
      },
      {
        path: 'cliente/crud',
        component: ClientCrudComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosListaComponent,
      },
    ],
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
];
