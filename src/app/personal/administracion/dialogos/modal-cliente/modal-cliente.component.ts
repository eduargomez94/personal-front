import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConstantes } from 'src/app/personal/constantes/api-personal.constantes';
import { Cliente } from 'src/app/personal/modelos/cliente.modelo';
import { Empleado } from 'src/app/personal/modelos/empleado.modelo';
import {
  ITipoDocumentos,
  ITipoEstados,
  IEntidades,
  IPaises,
} from 'src/app/personal/modelos/iniciar-sesion.modelo';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaCliente,
  IRespuestaEmpleado,
  IRespuestaGeneral,
  IRespuestaGuardarCliente,
} from 'src/app/personal/modelos/respuesta-general.modelo';
import { ClientesService } from 'src/app/personal/servicios/clientes.service';
import { EmpleadosService } from 'src/app/personal/servicios/empleados.service';
import { EntidadesService } from 'src/app/personal/servicios/entidades.service';
import { MensajesService } from 'src/app/personal/servicios/mensajes.service';
import { TiposDocumentoService } from 'src/app/personal/servicios/tipos_documento.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss'],
})
export class ModalClienteComponent implements OnInit {
  listaDocumentos!: ITipoDocumentos[];
  listaPaises!: IPaises[];
  listaDepts!: IPaises[];
  listaCiudades!: IPaises[];

  listaEstados: ITipoEstados[] = [
    { codigo: 'A', descripcion: 'Activo' },
    { codigo: 'I', descripcion: 'Inactivo' },
  ];

  selectedCliente!: Cliente;
  dialogWidth: number = 90;

  @Input() idCliente!: number;

  @Output() accepted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  formCliente: FormGroup = new FormGroup({});

  fileInputLabel = '...';
  public imageSrc: string = '../../../../../assets/img/sin_logo.jpg';
  public selectedFileName: string = 'Ningún archivo seleccionado';
  public fileFoto!: File;
  public base64Foto!: string;

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
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.formCliente = new FormGroup({
      tipoDoc: new FormControl('', [Validators.required]),
      noDoc: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      pais: new FormControl('', []),
      depto: new FormControl('', []),
      ciudad: new FormControl('', []),
      direccion: new FormControl('', []),
      telefono: new FormControl('', []),
      contacto: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      sitio: new FormControl('', []),
      estado: new FormControl('', [Validators.required]),
    });

    this.consultarTiposDocumento();
    this.consultarPaises();
    if (this.idCliente !== 0) {
      this.consultarCliente();
    }
  }

  //Form Cliente
  get tipoDoc() {
    return this.formCliente.get('tipoDoc');
  }

  get noDoc() {
    return this.formCliente.get('noDoc');
  }

  get nombres() {
    return this.formCliente.get('nombres');
  }

  get pais() {
    return this.formCliente.get('pais');
  }

  get depto() {
    return this.formCliente.get('depto');
  }

  get ciudad() {
    return this.formCliente.get('ciudad');
  }

  get direccion() {
    return this.formCliente.get('direccion');
  }

  get telefono() {
    return this.formCliente.get('telefono');
  }

  get contacto() {
    return this.formCliente.get('contacto');
  }

  get email() {
    return this.formCliente.get('email');
  }

  get sitio() {
    return this.formCliente.get('sitio');
  }

  get estado() {
    return this.formCliente.get('estado');
  }

  accept() {
    if (this.idCliente === 0) {
      this.guardar();
    } else {
      this.actualizar();
    }
  }

  cancel() {
    this.canceled.emit();
  }

  setValue(campo: string, valor: any) {
    const campoSel = this.formCliente.get(campo);
    campoSel?.setValue(valor);
    campoSel?.markAsTouched();
  }

  getValue(campo: string) {
    if (this.formCliente.get(campo) && this.formCliente.get(campo)?.value) {
      return this.formCliente.get(campo)?.value;
    } else {
      return '';
    }
  }

  onFileSelected(event: any) {
    this.fileFoto = event.target.files[0];
    this.previewImage(this.fileFoto);
    this.selectedFileName = this.fileFoto
      ? this.fileFoto.name
      : 'Ningún archivo seleccionado';
    this.convertToBase64();
  }

  convertToBase64(): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.base64Foto = reader.result as string;
    };
    reader.readAsDataURL(this.fileFoto);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
    };
    reader.readAsDataURL(file);
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

  consultarCliente() {
    this.clientesService
      .consultarCliente(this.idCliente)
      .subscribe((respuesta: IRespuestaCliente<any[]>) => {
        if (respuesta.data !== null && respuesta.data !== undefined) {
          this.selectedCliente = respuesta.data;
          this.setValue('tipoDoc', this.selectedCliente.tipo_documento);
          this.setValue('noDoc', this.selectedCliente.no_documento);
          this.setValue('nombres', this.selectedCliente.nombre);
          this.setValue('email', this.selectedCliente.email);
          this.setValue('telefono', this.selectedCliente.telefono);
          this.setValue('contacto', this.selectedCliente.contacto);
          this.setValue('direccion', this.selectedCliente.direccion);
          this.setValue('sitio', this.selectedCliente.pagina_web);
          this.setValue('estado', this.selectedCliente.estado);
          this.setValue('pais', this.selectedCliente.id_pais);

          if (this.selectedCliente.id_pais) {
            this.consultarDeptos(
              this.selectedCliente.id_pais + '',
              this.selectedCliente.id_depto,
              this.selectedCliente.id_ciudad
            );
          }

          if (
            this.selectedCliente.file_logo &&
            this.selectedCliente.nombre_logo
          ) {
            this.imageSrc = this.selectedCliente.file_logo;
            this.selectedFileName = this.selectedCliente.nombre_logo;
          }
        }
      });
  }

  consultarTiposDocumento() {
    this.tiposDocumentoService
      .consultarTiposDocumento()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        this.listaDocumentos = respuesta.data;
      });
  }

  consultarPaises() {
    this.empleadosService
      .consultarPaises()
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        this.listaPaises = respuesta.data;
      });
  }

  consultarDeptos(
    idPais: string,
    idDepto: number | undefined,
    idCiudad: number | undefined
  ) {
    this.empleadosService
      .consultarDptos(idPais)
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        this.listaDepts = respuesta.data;
        if (idDepto) {
          this.setValue('depto', idDepto);
          this.consultarCiudades(idDepto + '', idCiudad);
        }
      });
  }

  consultarCiudades(idDepto: string, idCiudad: number | undefined) {
    this.empleadosService
      .consultarCiudades(idDepto)
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        this.listaCiudades = respuesta.data;
        if (idCiudad) {
          this.setValue('ciudad', idCiudad);
        }
      });
  }

  changePais(event: Event) {
    const idPais = (event.target as HTMLSelectElement).value;
    this.consultarDeptos(idPais, undefined, undefined);
  }

  changeDepto(event: Event) {
    const idDepto = (event.target as HTMLSelectElement).value;
    this.consultarCiudades(idDepto, undefined);
  }

  guardar() {
    let data = this.getData();

    if (this.base64Foto !== undefined && this.base64Foto !== null) {
      data.nombre_logo = this.selectedFileName;
      data.file_logo = this.base64Foto;
    }

    this.clientesService.guardar(data).subscribe(
      (respuesta: IRespuestaGuardarCliente<any[]>) => {
        if (
          respuesta.id_cliente !== null &&
          respuesta.id_cliente !== undefined &&
          respuesta.id_cliente !== 0
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

    if (this.base64Foto !== undefined && this.base64Foto !== null) {
      data.nombre_logo = this.selectedFileName;
      data.file_logo = this.base64Foto;
    }

    this.clientesService.actualizar(data, this.idCliente).subscribe(
      (respuesta: IRespuestaActualizarEmpleado<any[]>) => {
        if (
          respuesta.exito !== null &&
          respuesta.exito !== undefined &&
          respuesta.exito !== 0
        ) {
          this.mensajesService.showSuccess(
            'Se actualizó el empleado con exito'
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
      tipo_documento: this.getValue('tipoDoc'),
      no_documento: this.getValue('noDoc'),
      nombre: this.getValue('nombres'),
      id_ciudad: this.getValue('ciudad') === '' ? 0 : this.getValue('ciudad'),
      direccion: this.getValue('direccion'),
      telefono: this.getValue('telefono'),
      contacto: this.getValue('contacto'),
      email: this.getValue('email'),
      pagina_web: this.getValue('sitio'),
      logo:
        this.selectedCliente && this.selectedCliente.logo
          ? this.selectedCliente.logo
          : 0,
      file_logo: '',
      nombre_logo: '',
      estado: this.getValue('estado'),
    };
  }
}
