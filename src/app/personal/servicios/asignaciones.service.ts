import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaAsignacion,
  IRespuestaAsignaciones,
  IRespuestaGeneral,
  IRespuestaGuardarAsignacion,
  IRespuestaGuardarCliente,
} from '../modelos/respuesta-general.modelo';

@Injectable({
  providedIn: 'root',
})
export class AsignacionesService {
  private readonly urlBase: string = environment.apiPersonal;
  private readonly urlServicio = ApiConstantes;

  constructor(private readonly http: HttpClient) {}

  consultarAsignaciones(): Observable<IRespuestaAsignaciones<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.ASIGNACIONES.asignaciones}`;
    return this.http.get<IRespuestaAsignaciones<any[]>>(url);
  }

  consultarAsignacionesTabla(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.ASIGNACIONES.tabla}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarAsignacion(id: number): Observable<IRespuestaAsignacion<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.ASIGNACIONES.asignacion}/${id}`;
    return this.http.get<IRespuestaAsignacion<any[]>>(url);
  }

  guardar(data: any): Observable<IRespuestaGuardarAsignacion<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.ASIGNACIONES.asignacion}`;
    return this.http.post<IRespuestaGuardarAsignacion<any[]>>(url, data);
  }

  actualizar(
    data: any,
    id: number
  ): Observable<IRespuestaActualizarEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.ASIGNACIONES.asignacion}/${id}`;
    return this.http.put<IRespuestaActualizarEmpleado<any[]>>(url, data);
  }
}
