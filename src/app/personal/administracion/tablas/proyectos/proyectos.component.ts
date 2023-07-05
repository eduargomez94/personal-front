import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IRespuestaGeneral } from '../../../modelos/respuesta-general.modelo';
import { SharedService } from 'src/app/personal/servicios/shared.service';
import { ProyectosService } from 'src/app/personal/servicios/proyectos.service';
import { Proyecto } from 'src/app/personal/modelos/proyecto.modelo';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  idEmpleado: number = 0;

  proyectos!: Proyecto[];
  loading: boolean = true;

  public isDialogOpen = false;

  constructor(private proyectosService: ProyectosService, private sharedService: SharedService) { }

  ngOnInit() {
    this.consultarProyectos();
  }

  clear(table: Table) {
    table.clear();
  }

  consultarProyectos() {
    this.proyectosService.consultarProyectos().subscribe((respuesta: IRespuestaGeneral<any[]>) => {
      if (respuesta.data.length > 0) {
        this.proyectos = respuesta.data;
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
    this.consultarProyectos();
  }

  onDialogCanceled() {
    this.isDialogOpen = false;
  }
}
