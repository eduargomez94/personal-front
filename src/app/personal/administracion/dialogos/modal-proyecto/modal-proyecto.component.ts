import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/personal/modelos/cliente.modelo';
import {
  ITipoDocumentos,
  ITipoEstados,
  IPaises,
  ITipoProyecto,
} from 'src/app/personal/modelos/iniciar-sesion.modelo';
import { Proyecto } from 'src/app/personal/modelos/proyecto.modelo';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaCliente,
  IRespuestaGeneral,
  IRespuestaGuardarCliente,
  IRespuestaGuardarProyecto,
  IRespuestaProyecto,
} from 'src/app/personal/modelos/respuesta-general.modelo';
import { ClientesService } from 'src/app/personal/servicios/clientes.service';
import { EmpleadosService } from 'src/app/personal/servicios/empleados.service';
import { MensajesService } from 'src/app/personal/servicios/mensajes.service';
import { ProyectosService } from 'src/app/personal/servicios/proyectos.service';
import { TiposDocumentoService } from 'src/app/personal/servicios/tipos_documento.service';

@Component({
  selector: 'app-modal-proyecto',
  templateUrl: './modal-proyecto.component.html',
  styleUrls: ['./modal-proyecto.component.scss'],
})
export class ModalProyectoComponent implements OnInit {
  listaClientes!: Cliente[];
  listaTipoProyecto!: ITipoProyecto[];

  listaEstados: ITipoEstados[] = [
    { codigo: 'A', descripcion: 'Activo' },
    { codigo: 'I', descripcion: 'Inactivo' },
  ];

  selectedProyecto!: Proyecto;
  dialogWidth: number = 90;

  @Input() idProyecto!: number;

  @Output() accepted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  formProyecto: FormGroup = new FormGroup({});

  public pagActual = 0;
  public pagTotal = 0;

  public disSiguiente = false;
  public disAnterior = false;

  public lstAyuda = [];
  public ayuda = null;

  constructor(
    private clientesService: ClientesService,
    private mensajesService: MensajesService,
    private tiposDocumentoService: TiposDocumentoService,
    private empleadosService: EmpleadosService,
    private proyectosService: ProyectosService
  ) {}

  ngOnInit(): void {
    this.formProyecto = new FormGroup({
      cliente: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', []),
      tipo: new FormControl('', []),
      fecInicio: new FormControl('', []),
      fecFinProyectada: new FormControl('', []),
      fecFinReal: new FormControl('', []),
      valorPres: new FormControl('', []),
      estado: new FormControl('', [Validators.required]),
    });

    this.consultarTipoProyectos();
    this.consultarClientes();
    if (this.idProyecto !== 0) {
      this.consultarProyecto();
    }
  }

  //Form Proyecto
  get cliente() {
    return this.formProyecto.get('cliente');
  }

  get nombre() {
    return this.formProyecto.get('nombre');
  }

  get descripcion() {
    return this.formProyecto.get('descripcion');
  }

  get tipo() {
    return this.formProyecto.get('tipo');
  }

  get fecInicio() {
    return this.formProyecto.get('fecInicio');
  }

  get fecFinProyectada() {
    return this.formProyecto.get('fecFinProyectada');
  }

  get fecFinReal() {
    return this.formProyecto.get('fecFinReal');
  }

  get valorPres() {
    return this.formProyecto.get('valorPres');
  }

  get estado() {
    return this.formProyecto.get('estado');
  }

  accept() {
    if (this.idProyecto === 0) {
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

  paginaSiguiente() {
    if (this.pagActual >= 0 && this.pagActual < this.pagTotal) {
      this.pagActual++;
      this.ayuda = this.lstAyuda[this.pagActual - 1];
      if (this.pagActual > 1) {
        this.disAnterior = true;
      }
    }

    if (this.pagActual >= this.pagTotal) {
      this.disSiguiente = false;
    } else {
      this.disSiguiente = true;
    }
  }

  paginaAnterior() {
    if (this.pagActual > 1 && this.pagActual <= this.pagTotal) {
      this.disSiguiente = true;
      this.pagActual--;
      this.ayuda = this.lstAyuda[this.pagActual - 1];
    }

    if (this.pagActual <= 1) {
      this.disAnterior = false;
    } else {
      this.disAnterior = true;
    }
  }

  consultarClientes() {
    this.clientesService
      .consultarClientesActivos()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        if (respuesta.data.length > 0) {
          this.listaClientes = respuesta.data;
        }
      });
  }

  consultarTipoProyectos() {
    this.proyectosService
      .consultarTipoProyectos()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        if (respuesta.data.length > 0) {
          this.listaTipoProyecto = respuesta.data;
        }
      });
  }

  consultarProyecto() {
    this.proyectosService
      .consultarProyecto(this.idProyecto)
      .subscribe((respuesta: IRespuestaProyecto<any[]>) => {
        if (respuesta.data !== null && respuesta.data !== undefined) {
          this.selectedProyecto = respuesta.data;
          this.setValue('cliente', this.selectedProyecto.id_cliente);
          this.setValue('nombre', this.selectedProyecto.nombre);
          this.setValue('descripcion', this.selectedProyecto.descripcion);
          this.setValue('tipo', this.selectedProyecto.id_tipo_proyecto);
          this.setValue('fecInicio', this.selectedProyecto.fecha_inicio);
          this.setValue(
            'fecFinProyectada',
            this.selectedProyecto.fecha_fin_proyectada
          );
          this.setValue('fecFinReal', this.selectedProyecto.fecha_fin_real);
          this.setValue('valorPres', this.selectedProyecto.valor_presupuestado);
          this.setValue('estado', this.selectedProyecto.estado);
        }
      });
  }

  guardar() {
    let data = this.getData();

    this.proyectosService.guardar(data).subscribe(
      (respuesta: IRespuestaGuardarProyecto<any[]>) => {
        if (
          respuesta.id_proyecto !== null &&
          respuesta.id_proyecto !== undefined &&
          respuesta.id_proyecto !== 0
        ) {
          this.mensajesService.showSuccess('Se creó el empleado con exito');
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

    this.proyectosService.actualizar(data, this.idProyecto).subscribe(
      (respuesta: IRespuestaActualizarEmpleado<any[]>) => {
        if (
          respuesta.exito !== null &&
          respuesta.exito !== undefined &&
          respuesta.exito !== 0
        ) {
          this.mensajesService.showSuccess(
            'Se actualizó el proyecto con exito'
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
      nombre: this.getValue('nombre'),
      descripcion: this.getValue('descripcion'),
      id_tipo_proyecto:
        this.getValue('tipo') === '' ? 0 : this.getValue('tipo'),
      fecha_inicio: this.getValue('fecInicio'),
      fecha_fin_proyectada: this.getValue('fecFinProyectada'),
      fecha_fin_real: this.getValue('fecFinReal'),
      valor_presupuestado:
        this.getValue('valorPres') === '' ? '0' : this.getValue('valorPres'),
      id_cliente:
        this.getValue('cliente') === '' ? 0 : this.getValue('cliente'),
      estado: this.getValue('estado'),
    };
  }
}
