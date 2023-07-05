import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import { IRespuestaGeneral } from '../modelos/respuesta-general.modelo';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  private readonly urlBase: string = environment.apiPersonal;
  private readonly urlServicio = ApiConstantes;

  constructor(
    private readonly http: HttpClient
  ) { }

  consultarEntidades(tipo: string): Observable<IRespuestaGeneral<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.ENTIDAD.entidades}${tipo}`;
    return this.http.get<IRespuestaGeneral<any[]>>(url);
  }
}
