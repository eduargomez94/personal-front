import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiConstantes } from '../constantes/api-personal.constantes';
import {
  IRespuestaIngresar,
  IRespuestaMenus,
} from '../modelos/respuesta-general.modelo';
import { StorageService } from './storage.service';

declare var btoa: any;

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
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

  ingresar(
    email: string,
    password: string
  ): Observable<IRespuestaIngresar<any[]>> {
    const url = `${this.urlBase}${this.urlServicio.INICIAR_SESION.ingresar}`;
    const info = {
      email: email,
      contrasena: btoa(password),
    };
    return this.http.post<IRespuestaIngresar<any[]>>(url, info);
  }

  consultarMenus(id_rol: number): Observable<IRespuestaMenus<any[]>> {
    const headers = this.getHeaders();
    const url = `${this.urlBase}${this.urlServicio.INICIAR_SESION.menus}`;
    const info = {
      id_rol: id_rol,
    };
    return this.http.post<IRespuestaMenus<any[]>>(url, info, { headers });
  }
}
