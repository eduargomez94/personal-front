import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaGeneral,
  IRespuestaGuardarProyecto,
  IRespuestaProyecto,
} from '../modelos/respuesta-general.modelo';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private readonly urlBase: string = environment.apiPersonal;
  private readonly urlServicio = ApiConstantes;

  constructor(private readonly http: HttpClient) {}

  consultarProyectos(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.PROYECTOS.proyectos}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarTipoProyectosActivos(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.PROYECTOS.activos}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarTipoProyectos(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.PROYECTOS.tipoProyecto}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarProyecto(id: number): Observable<IRespuestaProyecto<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.PROYECTOS.proyecto}/${id}`;
    return this.http.get<IRespuestaProyecto<any[]>>(url);
  }

  guardar(data: any): Observable<IRespuestaGuardarProyecto<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.PROYECTOS.proyecto}`;
    return this.http.post<IRespuestaGuardarProyecto<any[]>>(url, data);
  }

  actualizar(
    data: any,
    id: number
  ): Observable<IRespuestaActualizarEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.PROYECTOS.proyecto}/${id}`;
    return this.http.put<IRespuestaActualizarEmpleado<any[]>>(url, data);
  }
}
