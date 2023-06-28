export interface IRespuestaGeneral {
  mensaje         : string;
  codigoRespuesta : string;
  datos           : string;
}

export interface IRespuesta<T> {
  mensaje         : string;
  codigoRespuesta : string;
  datos           : T;
}

export interface IRespuestaLdap {
  mensaje: string,
  codigoRespuesta: string,
  datos: {
    esAutenticado: boolean,
    esAdministrador: boolean,
    grupoUsuario: {
      codigo: string,
      valor: string,
      descripcion: string
    }
  }
}
