import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RutasAutenticacion } from './autenticacion.routing';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    InicioSesionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(RutasAutenticacion)
  ]
})
export class AutenticacionModule { }
