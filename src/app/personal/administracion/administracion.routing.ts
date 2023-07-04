import { Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { EmpleadosComponent } from './tablas/empleados/empleados.component';

export const RutasAdministracion: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [AutenticacionGuard],
        data: { paso1: true, paso2: false }
      }
    ],
  },
];
