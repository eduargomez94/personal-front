import { Empleado } from "./empleado.modelo";

export interface IRespuestaIngresar<T> {
  success: number;
  esAutenticado: boolean;
  token: string;
  roles: []
}

export interface IRespuestaMenus<T> {
  data: []
}

export interface IRespuestaGeneral<T> {
  data: []
}

export interface IRespuestaEmpleado<T> {
  data: Empleado
}

export interface IRespuestaGuardarEmpleado<T> {
  id_empleado: number
}

export interface IRespuestaActualizarEmpleado<T> {
  exito: number
}
