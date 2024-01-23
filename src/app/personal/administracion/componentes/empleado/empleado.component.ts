import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConstantes } from 'src/app/personal/constantes/api-personal.constantes';
import { Empleado } from 'src/app/personal/modelos/empleado.modelo';
import {
  ITipoDocumentos,
  ITipoEstados,
  IEntidades,
} from 'src/app/personal/modelos/iniciar-sesion.modelo';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaEmpleado,
  IRespuestaGeneral,
  IRespuestaGuardarEmpleado,
} from 'src/app/personal/modelos/respuesta-general.modelo';
import { EmpleadosService } from 'src/app/personal/servicios/empleados.service';
import { EntidadesService } from 'src/app/personal/servicios/entidades.service';
import { MensajesService } from 'src/app/personal/servicios/mensajes.service';
import { TiposDocumentoService } from 'src/app/personal/servicios/tipos_documento.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
})
export class EmpleadoComponent implements OnInit {
  listaPension!: IEntidades[];
  listaSalud!: IEntidades[];
  listaArl!: IEntidades[];
  listaDocumentos!: ITipoDocumentos[];

  listaEstados: ITipoEstados[] = [
    { codigo: 'A', descripcion: 'Activo' },
    { codigo: 'I', descripcion: 'Inactivo' },
  ];

  selectedEmpleado!: Empleado;
  dialogWidth: number = 90;

  @Input() idEmpleado!: number;
  @Input() empleados!: boolean;

  @Output() accepted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  formEmpleado: FormGroup = new FormGroup({});

  fileInputLabel = '...';
  public imageSrc: string = '../../../../../assets/img/perfil_general.jpg';
  public selectedFileName: string = 'Ningún archivo seleccionado';
  public fileFoto!: File;
  public base64Foto!: string;

  public selectedHojaFileName: string = 'Ningún archivo seleccionado';
  public fileHoja!: File;
  public base64Hoja!: string;

  public btnDescargar: boolean = false;

  pdfData: string = '';

  public pagActual = 0;
  public pagTotal = 0;

  public disSiguiente = false;
  public disAnterior = false;

  public lstAyuda = [];
  public ayuda = null;

  constructor(
    private empleadosService: EmpleadosService,
    private mensajesService: MensajesService,
    private entidadesService: EntidadesService,
    private tiposDocumentoService: TiposDocumentoService
  ) {}

  ngOnInit(): void {
    if (this.empleados === undefined) {
      this.empleados = false;
    }
    this.formEmpleado = new FormGroup({
      tipoDoc: new FormControl('', [Validators.required]),
      noDoc: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      emailPersonal: new FormControl('', [Validators.email]),
      emailCorp: new FormControl('', [Validators.email]),
      celular: new FormControl('', []),
      fecCumple: new FormControl('', []),
      direccion: new FormControl('', []),
      hojaVida: new FormControl('', []),
      salud: new FormControl('', []),
      pension: new FormControl('', []),
      arl: new FormControl('', []),
      estado: new FormControl('', [Validators.required]),
    });

    this.consultarTiposDocumento();
    this.consultarEntidades(ApiConstantes.CONSTANTES_ENTIDADES.pension);
    this.consultarEntidades(ApiConstantes.CONSTANTES_ENTIDADES.salud);
    this.consultarEntidades(ApiConstantes.CONSTANTES_ENTIDADES.arl);
    if (!this.empleados) {
      this.consultarEmpleadoMisDatos();
    } else if (this.idEmpleado !== 0) {
      this.consultarEmpleado();
    }
  }

  //Form Empleado
  get tipoDoc() {
    return this.formEmpleado.get('tipoDoc');
  }

  get noDoc() {
    return this.formEmpleado.get('noDoc');
  }

  get apellidos() {
    return this.formEmpleado.get('apellidos');
  }

  get nombres() {
    return this.formEmpleado.get('nombres');
  }

  get emailPersonal() {
    return this.formEmpleado.get('emailPersonal');
  }

  get emailCorp() {
    return this.formEmpleado.get('emailCorp');
  }

  get celular() {
    return this.formEmpleado.get('celular');
  }

  get fecCumple() {
    return this.formEmpleado.get('fecCumple');
  }

  get direccion() {
    return this.formEmpleado.get('direccion');
  }

  get hojaVida() {
    return this.formEmpleado.get('hojaVida');
  }

  get salud() {
    return this.formEmpleado.get('salud');
  }

  get pension() {
    return this.formEmpleado.get('pension');
  }

  get arl() {
    return this.formEmpleado.get('arl');
  }

  get estado() {
    return this.formEmpleado.get('estado');
  }

  accept() {
    if (!this.btnDescargar) {
      if (this.idEmpleado === 0) {
        this.guardarEmpleado();
      } else {
        this.actualizarEmpleado();
      }
    }
  }

  cancel() {
    this.canceled.emit();
  }

  setValue(campo: string, valor: any) {
    const campoSel = this.formEmpleado.get(campo);
    campoSel?.setValue(valor);
    campoSel?.markAsTouched();
  }

  getValue(campo: string) {
    if (this.formEmpleado.get(campo) && this.formEmpleado.get(campo)?.value) {
      return this.formEmpleado.get(campo)?.value;
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

  onFileSelectedPdf(event: any) {
    this.fileHoja = event.target.files[0];
    this.selectedHojaFileName = this.fileHoja
      ? this.fileHoja.name
      : 'Ningún archivo seleccionado';
    this.convertToBase64Pdf();
    this.setValue('hojaVida', this.selectedHojaFileName);
  }

  convertToBase64Pdf(): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.base64Hoja = reader.result as string;
    };
    reader.readAsDataURL(this.fileHoja);
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

  descargarPDF() {
    this.btnDescargar = true;
    // Obtén el string base64 de tu PDF
    const base64String = this.pdfData.replace(
      'data:application/pdf;base64,',
      ''
    );

    // Decodifica el string base64 en un ArrayBuffer
    const binaryString = window.atob(base64String);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const buffer = new ArrayBuffer(binaryLen);
    const arr = new Uint8Array(buffer);
    for (let i = 0; i < binaryLen; i++) {
      arr[i] = bytes[i];
    }

    // Crea un objeto Blob a partir del ArrayBuffer
    const blob = new Blob([buffer], { type: 'application/pdf' });

    // Crea una URL para el objeto Blob
    const url = URL.createObjectURL(blob);

    // Crea un enlace de descarga y configúralo para descargar el PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = this.selectedHojaFileName;
    link.click();

    // Limpia la URL creada después de un tiempo para liberar recursos
    setTimeout(() => {
      URL.revokeObjectURL(url);
      this.btnDescargar = false;
    }, 2000);
  }

  consultarEmpleado() {
    this.empleadosService
      .consultarEmpleado(this.idEmpleado)
      .subscribe((respuesta: IRespuestaEmpleado<any[]>) => {
        if (respuesta.data !== null && respuesta.data !== undefined) {
          this.selectedEmpleado = respuesta.data;
          this.setValue('tipoDoc', this.selectedEmpleado.id_tipo_doc);
          this.setValue('noDoc', this.selectedEmpleado.no_documento);
          this.setValue('apellidos', this.selectedEmpleado.apellidos);
          this.setValue('nombres', this.selectedEmpleado.nombres);
          this.setValue('emailPersonal', this.selectedEmpleado.email_personal);
          this.setValue('emailCorp', this.selectedEmpleado.email_corporativo);
          this.setValue('celular', this.selectedEmpleado.celular);
          this.setValue('fecCumple', this.selectedEmpleado.fecha_cumpleanos);
          this.setValue('direccion', this.selectedEmpleado.direccion);
          this.setValue('hojaVida', this.selectedEmpleado.hoja_vida);
          this.setValue('salud', this.selectedEmpleado.entidad_salud);
          this.setValue('pension', this.selectedEmpleado.entidad_pension);
          this.setValue('arl', this.selectedEmpleado.entidad_arl);
          this.setValue('estado', this.selectedEmpleado.estado);

          if (
            this.selectedEmpleado.file_foto &&
            this.selectedEmpleado.fotografia
          ) {
            this.imageSrc = this.selectedEmpleado.file_foto;
            this.selectedFileName = this.selectedEmpleado.fotografia;
          }

          if (
            this.selectedEmpleado.file_hoja &&
            this.selectedEmpleado.hoja_vida
          ) {
            this.pdfData = this.selectedEmpleado.file_hoja;
            this.selectedHojaFileName = this.selectedEmpleado.hoja_vida;
          }
        }
      });
  }

  consultarEmpleadoMisDatos() {
    this.empleadosService
      .consultarEmpleadoMisDatos()
      .subscribe((respuesta: IRespuestaEmpleado<any[]>) => {
        if (respuesta.data !== null && respuesta.data !== undefined) {
          this.selectedEmpleado = respuesta.data;
          this.idEmpleado = this.selectedEmpleado.id;
          this.setValue('tipoDoc', this.selectedEmpleado.id_tipo_doc);
          this.setValue('noDoc', this.selectedEmpleado.no_documento);
          this.setValue('apellidos', this.selectedEmpleado.apellidos);
          this.setValue('nombres', this.selectedEmpleado.nombres);
          this.setValue('emailPersonal', this.selectedEmpleado.email_personal);
          this.setValue('emailCorp', this.selectedEmpleado.email_corporativo);
          this.setValue('celular', this.selectedEmpleado.celular);
          this.setValue('fecCumple', this.selectedEmpleado.fecha_cumpleanos);
          this.setValue('direccion', this.selectedEmpleado.direccion);
          this.setValue('hojaVida', this.selectedEmpleado.hoja_vida);
          this.setValue('salud', this.selectedEmpleado.entidad_salud);
          this.setValue('pension', this.selectedEmpleado.entidad_pension);
          this.setValue('arl', this.selectedEmpleado.entidad_arl);
          this.setValue('estado', this.selectedEmpleado.estado);

          if (
            this.selectedEmpleado.file_foto &&
            this.selectedEmpleado.fotografia
          ) {
            this.imageSrc = this.selectedEmpleado.file_foto;
            this.selectedFileName = this.selectedEmpleado.fotografia;
          }

          if (
            this.selectedEmpleado.file_hoja &&
            this.selectedEmpleado.hoja_vida
          ) {
            this.pdfData = this.selectedEmpleado.file_hoja;
            this.selectedHojaFileName = this.selectedEmpleado.hoja_vida;
          }
        }
      });
  }

  consultarEntidades(tipo: string) {
    this.entidadesService
      .consultarEntidades(tipo)
      .subscribe((respuesta: IRespuestaGeneral<any[]>) => {
        if (respuesta.data !== null && respuesta.data !== undefined) {
          if (tipo === ApiConstantes.CONSTANTES_ENTIDADES.pension) {
            this.listaPension = respuesta.data;
          } else if (tipo === ApiConstantes.CONSTANTES_ENTIDADES.salud) {
            this.listaSalud = respuesta.data;
          } else if (tipo === ApiConstantes.CONSTANTES_ENTIDADES.arl) {
            this.listaArl = respuesta.data;
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

  guardarEmpleado() {
    let data = this.getData();

    if (this.base64Foto !== undefined && this.base64Foto !== null) {
      data.fotografia = this.selectedFileName;
      data.file_foto = this.base64Foto;
    }

    if (this.base64Hoja !== undefined && this.base64Hoja !== null) {
      data.hoja_vida = this.selectedHojaFileName;
      data.file_hoja = this.base64Hoja;
    }

    this.empleadosService.guardarEmpleado(data).subscribe(
      (respuesta: IRespuestaGuardarEmpleado<any[]>) => {
        if (
          respuesta.id_empleado !== null &&
          respuesta.id_empleado !== undefined &&
          respuesta.id_empleado !== 0
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

  actualizarEmpleado() {
    const data = this.getData();

    if (this.base64Foto !== undefined && this.base64Foto !== null) {
      data.fotografia = this.selectedFileName;
      data.file_foto = this.base64Foto;
    }

    if (this.base64Hoja !== undefined && this.base64Hoja !== null) {
      data.hoja_vida = this.selectedHojaFileName;
      data.file_hoja = this.base64Hoja;
    }

    this.empleadosService.actualizarEmpleado(data, this.idEmpleado).subscribe(
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
      id_tipo_doc: this.getValue('tipoDoc'),
      no_documento: this.getValue('noDoc'),
      apellidos: this.getValue('apellidos'),
      nombres: this.getValue('nombres'),
      email_personal: this.getValue('emailPersonal'),
      email_corporativo: this.getValue('emailCorp'),
      celular: this.getValue('celular'),
      direccion: this.getValue('direccion'),
      id_ciudad: 5001,
      hoja_vida: '',
      fecha_cumpleanos: this.getValue('fecCumple'),
      entidad_salud: this.getValue('salud') === '' ? 0 : this.getValue('salud'),
      entidad_pension:
        this.getValue('pension') === '' ? 0 : this.getValue('pension'),
      entidad_ARL: this.getValue('arl') === '' ? 0 : this.getValue('arl'),
      estado: this.getValue('estado'),
      fotografia: '',
      fecha_aniversario: '',
      perfil_tecnico: '',
      file_foto: '',
      file_hoja: '',
    };
  }
}
