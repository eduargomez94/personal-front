import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Asignacion } from 'src/app/personal/modelos/asignacion.modelo';
import { Cliente } from 'src/app/personal/modelos/cliente.modelo';
import {
  IProyecto,
  ITipoEstados,
  ITipoProyecto,
} from 'src/app/personal/modelos/iniciar-sesion.modelo';
import { Proyecto } from 'src/app/personal/modelos/proyecto.modelo';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaAsignacion,
  IRespuestaGeneral,
  IRespuestaGuardarAsignacion,
  IRespuestaGuardarProyecto,
  IRespuestaProyecto,
} from 'src/app/personal/modelos/respuesta-general.modelo';
import { AsignacionesService } from 'src/app/personal/servicios/asignaciones.service';
import { ClientesService } from 'src/app/personal/servicios/clientes.service';
import { EmpleadosService } from 'src/app/personal/servicios/empleados.service';
import { MensajesService } from 'src/app/personal/servicios/mensajes.service';
import { ProyectosService } from 'src/app/personal/servicios/proyectos.service';
import { TiposDocumentoService } from 'src/app/personal/servicios/tipos_documento.service';

@Component({
  selector: 'app-modal-asignacion',
  templateUrl: './modal-asignacion.component.html',
  styleUrls: ['./modal-asignacion.component.scss'],
})
export class ModalAsignacionComponent implements OnInit {
  listaProyectos!: IProyecto[];
  selectedAsignacion!: Asignacion;
  dialogWidth: number = 40;

  @Input() idEmpleado!: number;
  @Input() id!: number;

  @Output() accepted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  formProyecto: FormGroup = new FormGroup({});

  constructor(
    private asignacionService: AsignacionesService,
    private mensajesService: MensajesService,
    private proyectosService: ProyectosService
  ) {}

  ngOnInit(): void {
    console.log(this.idEmpleado);
    console.log(this.id);
    this.formProyecto = new FormGroup({
      proyecto: new FormControl('', [Validators.required]),
      fecInicio: new FormControl('', []),
      fecFin: new FormControl('', []),
    });

    this.consultarProyectosActivos();
    if (this.id !== 0) {
      this.consultarAsignacion();
    }
  }

  //Form asignacion
  get proyecto() {
    return this.formProyecto.get('proyecto');
  }

  get fecInicio() {
    return this.formProyecto.get('fecInicio');
  }

  get fecFin() {
    return this.formProyecto.get('fecFin');
  }

  accept() {
    if (this.id === 0) {
      this.guardar();
    } else {
      this.actualizar();
    }
  }

  cancel() {
    this.canceled.emit();
  }

  setValue(campo: string, valor: any) {
    const campoSel = this.formProyecto.get(campo);
    campoSel?.setValue(valor);
    campoSel?.markAsTouched();
  }

  getValue(campo: string) {
    if (this.formProyecto.get(campo) && this.formProyecto.get(campo)?.value) {
      return this.formProyecto.get(campo)?.value;
    } else {
      return '';
    }
  }

  consultarProyectosActivos() {
    this.proyectosService
      .consultarTipoProyectosActivos()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        if (respuesta.data.length > 0) {
          this.listaProyectos = respuesta.data;
        }
      });
  }

  consultarAsignacion() {
    this.asignacionService
      .consultarAsignacion(this.id)
      .subscribe((respuesta: IRespuestaAsignacion<any[]>) => {
        if (respuesta.data !== null && respuesta.data !== undefined) {
          this.selectedAsignacion = respuesta.data;
          this.idEmpleado = this.selectedAsignacion.id_empleado;
          this.setValue('proyecto', this.selectedAsignacion.id_proyecto);
          this.setValue('fecInicio', this.selectedAsignacion.fecha_inicio);
          this.setValue('fecFin', this.selectedAsignacion.fecha_fin);
        }
      });
  }

  guardar() {
    let data = this.getData();

    this.asignacionService.guardar(data).subscribe(
      (respuesta: IRespuestaGuardarAsignacion<any[]>) => {
        if (
          respuesta.id_asignacion !== null &&
          respuesta.id_asignacion !== undefined &&
          respuesta.id_asignacion !== 0
        ) {
          this.mensajesService.showSuccess('Se creó asignación con exito');
          this.accepted.emit();
        }
      },
      (error) => {
        this.mensajesService.showError(
          'Error al crear el registro, por favor contacte con el administrador'
        );
      }
    );
  }

  actualizar() {
    const data = this.getData();

    this.asignacionService.actualizar(data, this.id).subscribe(
      (respuesta: IRespuestaActualizarEmpleado<any[]>) => {
        if (
          respuesta.exito !== null &&
          respuesta.exito !== undefined &&
          respuesta.exito !== 0
        ) {
          this.mensajesService.showSuccess(
            'Se actualizó asignación con exito'
          );
          this.accepted.emit();
        }
      },
      (error) => {
        this.mensajesService.showError(
          'Error al actualizar el registro, por favor contacte con el administrador'
        );
      }
    );
  }

  getData() {
    return {
      id_proyecto: this.getValue('proyecto'),
      id_empleado: this.idEmpleado,
      fecha_inicio: this.getValue('fecInicio'),
      fecha_fin: this.getValue('fecFin'),
    };
  }
}
