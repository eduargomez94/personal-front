import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaEmpleado,
  IRespuestaGeneral,
  IRespuestaGuardarEmpleado,
} from '../modelos/respuesta-general.modelo';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private readonly urlBase: string = environment.apiPersonal;
  private readonly urlServicio = ApiConstantes;

  constructor(
    private readonly http: HttpClient,
    private storageService: StorageService
  ) {}

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.storageService.getToken()}`,
    });
  }

  consultarEmpleados(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleados}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarEmpleado(id: number): Observable<IRespuestaEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleado}/${id}`;
    return this.http.get<IRespuestaEmpleado<any[]>>(url);
  }

  consultarEmpleadoMisDatos(): Observable<IRespuestaEmpleado<any[]>> {
    const headers = this.getHeaders();
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.misDatos}`;
    return this.http.get<IRespuestaEmpleado<any[]>>(url, { headers });
  }

  guardarEmpleado(data: any): Observable<IRespuestaGuardarEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleado}`;
    return this.http.post<IRespuestaGuardarEmpleado<any[]>>(url, data);
  }

  actualizarEmpleado(
    data: any,
    id: number
  ): Observable<IRespuestaActualizarEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.empleado}/${id}`;
    return this.http.put<IRespuestaActualizarEmpleado<any[]>>(url, data);
  }

  consultarPaises(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.pais}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarDptos(idPais: string): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.departamentos}/${idPais}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarCiudades(idDepto: string): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.EMPLEADOS.ciudades}/${idDepto}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }
}
