import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import {
  IRespuestaActualizarEmpleado,
  IRespuestaCliente,
  IRespuestaGeneral,
  IRespuestaGuardarCliente,
} from '../modelos/respuesta-general.modelo';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly urlBase: string = environment.apiPersonal;
  private readonly urlServicio = ApiConstantes;

  constructor(private readonly http: HttpClient) {}

  consultarClientes(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.CLIENTES.clientes}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarClientesActivos(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.CLIENTES.clientesActivos}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }

  consultarCliente(id: number): Observable<IRespuestaCliente<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.CLIENTES.cliente}/${id}`;
    return this.http.get<IRespuestaCliente<any[]>>(url);
  }

  guardar(data: any): Observable<IRespuestaGuardarCliente<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.CLIENTES.cliente}`;
    return this.http.post<IRespuestaGuardarCliente<any[]>>(url, data);
  }

  actualizar(
    data: any,
    id: number
  ): Observable<IRespuestaActualizarEmpleado<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.CLIENTES.cliente}/${id}`;
    return this.http.put<IRespuestaActualizarEmpleado<any[]>>(url, data);
  }
}
