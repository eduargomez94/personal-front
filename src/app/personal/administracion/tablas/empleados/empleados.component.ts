import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { IRespuestaGeneral } from '../../../modelos/respuesta-general.modelo';
import { Empleado } from '../../../modelos/empleado.modelo';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  idEmpleado: number = 0;

  empleados!: Empleado[];
  loading: boolean = true;

  public isDialogOpen = false;

  constructor(private empleadosService: EmpleadosService) { }

  ngOnInit() {
    this.consultarEmpleados();
  }

  clear(table: Table) {
    table.clear();
  }

  consultarEmpleados() {
    this.empleadosService.consultarEmpleados().subscribe((respuesta: IRespuestaGeneral<any[]>) => {
      if (respuesta.data.length > 0) {
        this.empleados = respuesta.data;
      }
      this.loading = false;
    });
  }

  openDialog(idEmpleado: number) {
    this.idEmpleado = idEmpleado;
    this.isDialogOpen = true;
  }

  onDialogAccepted() {
    this.isDialogOpen = false;
    this.consultarEmpleados();
  }

  onDialogCanceled() {
    this.isDialogOpen = false;
  }
}
