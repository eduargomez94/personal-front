import { Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { SimuladorComponent } from './simulador/simulador.component';

export const RutasAdministracion: Routes = [
  {
    path: '',
    children: [
      {
        path: 'simulador/registro',
        component: SimuladorComponent,
        canActivate: [AutenticacionGuard],
        data: { paso1: true, paso2: false }
      }
    ],
  },
];
