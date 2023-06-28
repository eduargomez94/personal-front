import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapaAutenticacionComponent } from './personal/capas/capa-autenticacion/capa-autenticacion.component';
import { CapaAdministracionComponent } from './personal/capas/capa-administracion/capa-administracion.component';
import { AutenticacionGuard } from './personal/guards/autenticacion.guard';

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "ingresar",
    pathMatch: "full"
  },
  //Sales-30
  {
    path: "ingresar",
    component: CapaAutenticacionComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./personal/autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
      }
    ]
  },
  {
    path: "administracion",
    component: CapaAdministracionComponent,
    canActivate: [AutenticacionGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./personal/administracion/administracion.module').then(m => m.AdministracionModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];
