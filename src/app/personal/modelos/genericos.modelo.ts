export interface INotificacionConfirmar {
  titulo:        any;
  texto:         any;
  icono:         any;
  btnAceptar:   any;
  btnCancelar:  any;
  opcConfirmado?: INotifiacionGenerica;
}

export interface INotifiacionGenerica {
  titulo: string;
  texto:  string;
  icono:  any
}

export interface IFactoresSeleccionados {
  codigoFactores:       string;
  nombre:       string;
  seleccionado: boolean;
  orden:        number;
}
