import { Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { EmpleadosComponent } from './tablas/empleados/empleados.component';
import { ProyectosComponent } from './tablas/proyectos/proyectos.component';
import { AsignacionesComponent } from './tablas/asignaciones/asignaciones.component';
import { ClientesComponent } from './tablas/clientes/clientes.component';
import { EmpleadoComponent } from './componentes/empleado/empleado.component';

export const RutasAdministracion: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [AutenticacionGuard],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'proyectos',
        component: ProyectosComponent,
        canActivate: [AutenticacionGuard],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'asignaciones',
        component: AsignacionesComponent,
        canActivate: [AutenticacionGuard],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [AutenticacionGuard],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'mis-datos',
        component: EmpleadoComponent,
        canActivate: [AutenticacionGuard],
      },
    ],
  },
];
