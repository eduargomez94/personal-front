import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConstantes } from 'src/app/personal/constantes/api-personal.constantes';
import { Empleado } from 'src/app/personal/modelos/empleado.modelo';
import { IRoles, ITipoDocumentos, ITipoEstados, IEntidades } from 'src/app/personal/modelos/iniciar-sesion.modelo';
import { IRespuestaActualizarEmpleado, IRespuestaEmpleado, IRespuestaGeneral, IRespuestaGuardarEmpleado } from 'src/app/personal/modelos/respuesta-general.modelo';
import { EmpleadosService } from 'src/app/personal/servicios/empleados.service';
import { EntidadesService } from 'src/app/personal/servicios/entidades.service';
import { MensajesService } from 'src/app/personal/servicios/mensajes.service';
import { SharedService } from 'src/app/personal/servicios/shared.service';

@Component({
  selector: 'app-modal-empleado',
  templateUrl: './modal-empleado.component.html',
  styleUrls: ['./modal-empleado.component.scss']
})
export class ModalEmpleadoComponent implements OnInit {

  listaRoles!: IRoles[];
  listaPension!: IEntidades[];
  listaSalud!: IEntidades[];
  listaArl!: IEntidades[];
  listaDocumentos: ITipoDocumentos[] = [
    { Id_tipo_doc: 1, Descripcion: 'Cédula de ciudadanía' },
    { Id_tipo_doc: 2, Descripcion: 'NIT' },
    { Id_tipo_doc: 3, Descripcion: 'Pasaporte' },
    { Id_tipo_doc: 4, Descripcion: 'Cédula de extranjería' },
  ];

  listaEstados: ITipoEstados[] = [
    { codigo: "A", descripcion: 'Activo' },
    { codigo: "I", descripcion: 'Inactivo' },
  ];

  selectedEmpleado!: Empleado;
  dialogWidth: number = 90;

  @Input() idEmpleado!: number;

  @Output() accepted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  formEmpleado: FormGroup = new FormGroup({});

  fileInputLabel = '...';
  public imageSrc: string = '../../../../../assets/img/perfil_general.jpg';
  public selectedFileName: string = 'Ningún archivo seleccionado';

  public pagActual = 0;
  public pagTotal = 0;

  public disSiguiente = false;
  public disAnterior = false;

  public lstAyuda = [];
  public ayuda = null;

  constructor(
    public sharedService: SharedService,
    private empleadosService: EmpleadosService,
    private mensajesService: MensajesService,
    private entidadesService: EntidadesService
  ) { }

  ngOnInit(): void {
    this.listaRoles = this.sharedService.ROLES;

    this.formEmpleado = new FormGroup(
      {
        tipoDoc: new FormControl('', [
          Validators.required
        ]),
        noDoc: new FormControl('', [
          Validators.required
        ]),
        apellidos: new FormControl('', [
          Validators.required
        ]),
        nombres: new FormControl('', [
          Validators.required
        ]),
        emailPersonal: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        emailCorp: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        celular: new FormControl('', [
          Validators.required
        ]),
        fecCumple: new FormControl('', [
          Validators.required
        ]),
        direccion: new FormControl('', [
          Validators.required
        ]),
        hojaVida: new FormControl('', [
          Validators.required
        ]),
        salud: new FormControl('', [
          Validators.required
        ]),
        pension: new FormControl('', [
          Validators.required
        ]),
        arl: new FormControl('', [
          Validators.required
        ]),
        estado: new FormControl('', [
          Validators.required
        ])
      }
    );

    this.consultarEntidades(ApiConstantes.CONSTANTES_ENTIDADES.pension);
    this.consultarEntidades(ApiConstantes.CONSTANTES_ENTIDADES.salud);
    this.consultarEntidades(ApiConstantes.CONSTANTES_ENTIDADES.arl);
    if (this.idEmpleado !== 0) {
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
    if (this.idEmpleado === 0) {
      this.guardarEmpleado();
    } else {
      this.actualizarEmpleado();
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
    return this.formEmpleado.get(campo)?.value;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.previewImage(file);
    this.selectedFileName = file ? file.name : 'Ningún archivo seleccionado';
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

  consultarEmpleado() {
    this.empleadosService.consultarEmpleado(this.idEmpleado).subscribe((respuesta: IRespuestaEmpleado<any[]>) => {
      if (respuesta.data !== null && respuesta.data !== undefined) {
        this.selectedEmpleado = respuesta.data;
        this.setValue("tipoDoc", this.selectedEmpleado.Id_tipo_doc);
        this.setValue("noDoc", this.selectedEmpleado.No_documento);
        this.setValue("apellidos", this.selectedEmpleado.Apellidos);
        this.setValue("nombres", this.selectedEmpleado.Nombres);
        this.setValue("emailPersonal", this.selectedEmpleado.Email_personal);
        this.setValue("emailCorp", this.selectedEmpleado.Email_corporativo);
        this.setValue("celular", this.selectedEmpleado.Celular);
        this.setValue("fecCumple", this.selectedEmpleado.Fecha_cumpleanos);
        this.setValue("direccion", this.selectedEmpleado.Direccion);
        this.setValue("hojaVida", this.selectedEmpleado.Hoja_vida);
        this.setValue("salud", this.selectedEmpleado.Entidad_salud);
        this.setValue("pension", this.selectedEmpleado.Entidad_pension);
        this.setValue("arl", this.selectedEmpleado.Entidad_ARL);
        this.setValue("estado", this.selectedEmpleado.Estado);

        this.formEmpleado.valid;
      }
    });
  }

  consultarEntidades(tipo: string) {
    this.entidadesService.consultarEntidades(tipo).subscribe((respuesta: IRespuestaGeneral<any[]>) => {
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

  guardarEmpleado() {
    const data = {
      "id_tipo_doc": this.getValue("tipoDoc"),
      "no_documento": this.getValue("noDoc"),
      "apellidos": this.getValue("apellidos"),
      "nombres": this.getValue("nombres"),
      "email_personal": this.getValue("emailPersonal"),
      "email_corporativo": this.getValue("emailCorp"),
      "celular": this.getValue("celular"),
      "direccion": this.getValue("direccion"),
      "id_ciudad": 5001,
      "hoja_vida": "_hoja_vida",
      "fecha_cumpleanos": this.getValue("fecCumple"),
      "entidad_salud": this.getValue("salud"),
      "entidad_pension": this.getValue("pension"),
      "entidad_ARL": this.getValue("arl"),
      "estado": this.getValue("estado"),
      "fotografia": "_fotografia",
      "fecha_aniversario": "2023-05-05",
      "perfil_tecnico": "_perfil_tecnico"
    }

    this.empleadosService.guardarEmpleado(data).subscribe(
      (respuesta: IRespuestaGuardarEmpleado<any[]>) => {
        if (respuesta.id_empleado !== null && respuesta.id_empleado !== undefined && respuesta.id_empleado !== 0) {
          this.mensajesService.showSuccess("Se creó el empleado con exito");
          this.accepted.emit();
        }
      },
      (error) => {
        this.mensajesService.showError("Error al crear el registro, por favor contacte con el administrador");
      }
    );
  }

  actualizarEmpleado() {
    const data = {
      "id_tipo_doc": this.getValue("tipoDoc"),
      "no_documento": this.getValue("noDoc"),
      "apellidos": this.getValue("apellidos"),
      "nombres": this.getValue("nombres"),
      "email_personal": this.getValue("emailPersonal"),
      "email_corporativo": this.getValue("emailCorp"),
      "celular": this.getValue("celular"),
      "direccion": this.getValue("direccion"),
      "id_ciudad": 5001,
      "hoja_vida": "_hoja_vida",
      "fecha_cumpleanos": this.getValue("fecCumple"),
      "entidad_salud": this.getValue("salud"),
      "entidad_pension": this.getValue("pension"),
      "entidad_ARL": this.getValue("arl"),
      "estado": this.getValue("estado"),
      "fotografia": "_fotografia",
      "fecha_aniversario": "2023-05-05",
      "perfil_tecnico": "_perfil_tecnico"
    }

    this.empleadosService.actualizarEmpleado(data, this.idEmpleado).subscribe(
      (respuesta: IRespuestaActualizarEmpleado<any[]>) => {
        if (respuesta.exito !== null && respuesta.exito !== undefined && respuesta.exito !== 0) {
          this.mensajesService.showSuccess("Se actualizó el empleado con exito");
          this.accepted.emit();
        }
      },
      (error) => {
        this.mensajesService.showError("Error al actualizar el registro, por favor contacte con el administrador");
      }
    );
  }

}
