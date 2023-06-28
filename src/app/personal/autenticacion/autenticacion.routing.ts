import { Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
export const RutasAutenticacion: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: InicioSesionComponent
    }],
  }
];
