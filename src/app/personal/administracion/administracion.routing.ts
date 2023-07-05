import { Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { EmpleadosComponent } from './tablas/empleados/empleados.component';
import { ProyectosComponent } from './tablas/proyectos/proyectos.component';

export const RutasAdministracion: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [AutenticacionGuard]
      }
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'proyectos',
        component: ProyectosComponent,
        canActivate: [AutenticacionGuard]
      }
    ],
  },
];
