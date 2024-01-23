import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import {
  IRespuestaAsignaciones,
  IRespuestaGeneral,
} from '../../../modelos/respuesta-general.modelo';
import { AsignacionesService } from 'src/app/personal/servicios/asignaciones.service';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss'],
})
export class AsignacionesComponent implements OnInit {
  public cardColor: string[] = ['#DDEFF9', '#F8F9DD', '#F9DEDD'];
  public textColor: string[] = ['#BCE0F4', '#F4EFBC', '#F4BCBC'];

  idEmpleado: number = 0;
  id: number = 0;

  asignaciones!: any[];
  asignacionesTabla!: any[];
  sinAsignaciones!: any[];
  loading: boolean = true;

  public isDialogOpen = false;
  public isTarjetas = true;
  public hasSinAsig = false;

  constructor(private asignacionesService: AsignacionesService) {}

  ngOnInit() {
    this.consultarAsignaciones();
  }

  clear(table: Table) {
    table.clear();
  }

  consultarAsignaciones() {
    this.asignacionesService
      .consultarAsignaciones()
      .subscribe((respuesta: IRespuestaAsignaciones<any[]>) => {
        if (respuesta.data.length > 0) {
          this.asignaciones = respuesta.data;

          if (
            respuesta.empleadosSinAsig !== null &&
            respuesta.empleadosSinAsig.length > 0
          ) {
            this.hasSinAsig = true;
            this.sinAsignaciones = respuesta.empleadosSinAsig;

            let i = 0;
            for (let emp of this.sinAsignaciones) {
              if (!emp.file_foto) {
                emp.file_foto = '../../../../../assets/img/perfil_general.jpg';
              }
              if (i > 2) {
                i = 0;
              }
              emp.cardColor = this.cardColor[i];
              emp.textColor = this.textColor[i];
              i++;
            }
          }

          for (let asig of this.asignaciones) {
            if (asig.empleados && asig.empleados.length > 0) {
              let i = 0;
              for (let emp of asig.empleados) {
                if (!emp.file_foto) {
                  emp.file_foto =
                    '../../../../../assets/img/perfil_general.jpg';
                }
                if (i > 2) {
                  i = 0;
                }
                emp.cardColor = this.cardColor[i];
                emp.textColor = this.textColor[i];
                i++;
              }
            }
          }
        }
        this.consultarAsignacionesTabla();
      });
  }

  consultarAsignacionesTabla() {
    this.asignacionesService
      .consultarAsignacionesTabla()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        if (respuesta.data.length > 0) {
          this.asignacionesTabla = respuesta.data;
        }
        this.loading = false;
      });
  }

  openDialog(id: number, idEmpleado: number) {
    this.idEmpleado = idEmpleado;
    this.id = id;
    this.isDialogOpen = true;
  }

  onDialogAccepted() {
    this.isDialogOpen = false;
    this.consultarAsignaciones();
  }

  onDialogCanceled() {
    this.isDialogOpen = false;
  }

  clicBtns(isTarjetas: boolean) {
    this.isTarjetas = isTarjetas;
  }
}
