import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IRespuestaGeneral } from '../../../modelos/respuesta-general.modelo';
import { ProyectosService } from 'src/app/personal/servicios/proyectos.service';
import { Proyecto } from 'src/app/personal/modelos/proyecto.modelo';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
  idProyecto: number = 0;

  clientes!: Proyecto[];
  tipoProyectos!: Proyecto[];
  proyectos!: Proyecto[];
  loading: boolean = true;

  public isDialogOpen = false;

  constructor(private proyectosService: ProyectosService) {}

  ngOnInit() {
    this.consultarProyectos();
  }

  clear(table: Table) {
    table.clear();
  }

  consultarProyectos() {
    this.proyectosService
      .consultarProyectos()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        if (respuesta.data.length > 0) {
          this.proyectos = respuesta.data;

          this.clientes = this.proyectos
            .filter(
              (item, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.id_cliente === item.id_cliente &&
                    t.nombre_cliente === item.nombre_cliente
                )
            )
            .map(({ nombre_cliente }) => ({ nombre_cliente }));

          this.tipoProyectos = this.proyectos
            .filter(
              (item, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.id_tipo_proyecto === item.id_tipo_proyecto &&
                    t.nombre_tipo_proyecto === item.nombre_tipo_proyecto
                )
            )
            .map(({ nombre_tipo_proyecto }) => ({ nombre_tipo_proyecto }));
        }
        this.loading = false;
      });
  }

  openDialog(idProyecto: number) {
    this.idProyecto = idProyecto;
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
