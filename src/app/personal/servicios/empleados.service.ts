import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import { IRespuestaActualizarEmpleado, IRespuestaEmpleado, IRespuestaGeneral, IRespuestaGuardarEmpleado, IRespuestaMenus } from '../modelos/respuesta-general.modelo';
import { Empleado } from '../modelos/empleado.modelo';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private readonly urlBase: string = environment.apiPersonal;
  private readonly urlServicio = ApiConstantes;

  constructor(
    private readonly http: HttpClient
  ) { }

  consultarEmpleados(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleados}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarEmpleado(id: number): Observable<IRespuestaEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleado}/${id}`;
    return this.http.get<IRespuestaEmpleado<any[]>>(url);
  }

  guardarEmpleado(data: any): Observable<IRespuestaGuardarEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleado}`;
    return this.http.post<IRespuestaGuardarEmpleado<any[]>>(url, data);
  }

  actualizarEmpleado(data: any, id: number): Observable<IRespuestaActualizarEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleado}/${id}`;
    return this.http.put<IRespuestaActualizarEmpleado<any[]>>(url, data);
  }
}
