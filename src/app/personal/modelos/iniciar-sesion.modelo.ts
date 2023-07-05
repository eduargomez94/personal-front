export interface IIniciarSesion {
  usuario: string;
  password: string;
  token: string;
  ipConexion: string;
  dispositivo: string;
}

export interface IRoles {
  Id_rol: number;
  Nombre_rol: string;
}

export interface ITipoDocumentos {
  Id_tipo_doc: number;
  Descripcion: string;
}

export interface ITipoEstados {
  codigo: string;
  descripcion: string;
}

export interface IEntidades {
  Nombre: string;
  Tipo: string;
  Id_entidad: number;
}