import { Asignacion } from "./asignacion.modelo";
import { Cliente } from "./cliente.modelo";
import { Empleado } from "./empleado.modelo";
import { Proyecto } from "./proyecto.modelo";

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

export interface IRespuestaAsignaciones<T> {
  data: [];
  empleadosSinAsig: [];
}

export interface IRespuestaCliente<T> {
  data: Cliente
}

export interface IRespuestaProyecto<T> {
  data: Proyecto
}

export interface IRespuestaAsignacion<T> {
  data: Asignacion
}


export interface IRespuestaGuardarEmpleado<T> {
  id_empleado: number
}

export interface IRespuestaGuardarCliente<T> {
  id_cliente: number
}

export interface IRespuestaGuardarProyecto<T> {
  id_proyecto: number
}

export interface IRespuestaGuardarAsignacion<T> {
  id_asignacion: number
}

export interface IRespuestaActualizarEmpleado<T> {
  exito: number
}
