export interface IIniciarSesion {
  usuario: string;
  password: string;
  token: string;
  ipConexion: string;
  dispositivo: string;
}

export interface IRoles {
  id_rol: number;
  nombre: string;
}

export interface ITipoDocumentos {
  id: number;
  descripcion: string;
}

export interface ITipoEstados {
  codigo: string;
  descripcion: string;
}

export interface IEntidades {
  nombre: string;
  tipo: string;
  id: number;
}

export interface IPaises {
  nombre: string;
  id: number;
}

export interface ITipoProyecto {
  descripcion: string;
  id: number;
}

export interface IProyecto {
  nombre: string;
  id: number;
}
