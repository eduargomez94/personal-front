import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import { IRespuestaGeneral } from '../modelos/respuesta-general.modelo';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private readonly urlBase: string = environment.apiPersonal;
  private readonly urlServicio = ApiConstantes;

  constructor(
    private readonly http: HttpClient
  ) { }

  consultarProyectos(): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.PROYECTOS.proyectos}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }
}
