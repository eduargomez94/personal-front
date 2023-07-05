import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RutasAdministracion } from './administracion.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { EmpleadosComponent } from './tablas/empleados/empleados.component';
import { ModalEmpleadoComponent } from './dialogos/modal-empleado/modal-empleado.component';
import { ProyectosComponent } from './tablas/proyectos/proyectos.component';

@NgModule({
  declarations: [
    EmpleadosComponent,
    ModalEmpleadoComponent,
    ProyectosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TagModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(RutasAdministracion)
  ]
})
export class AdministracionModule { }
