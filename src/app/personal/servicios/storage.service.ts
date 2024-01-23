import { Injectable } from '@angular/core';

declare var btoa: any;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  guardarListaRoles(lista: any[]) {
    sessionStorage.setItem('RL', btoa(JSON.stringify(lista)));
  }

  listarRoles() {
    if (
      sessionStorage.getItem('RL') !== null &&
      sessionStorage.getItem('RL') !== undefined
    ) {
      let list = sessionStorage.getItem('RL') + '';
      return JSON.parse(atob(list));
    } else {
      return [];
    }
  }

  guardarListaMenus(lista: any[]) {
    sessionStorage.setItem('MN', btoa(JSON.stringify(lista)));
  }

  listarMenus() {
    if (
      sessionStorage.getItem('MN') !== null &&
      sessionStorage.getItem('MN') !== undefined
    ) {
      let list = sessionStorage.getItem('MN') + '';
      return JSON.parse(atob(list));
    } else {
      return [];
    }
  }

  getToken(): string {
    return localStorage.getItem('TK_APP') + '';
  }

  usuarioActivo(): boolean {
    return !!this.getToken();
  }
}
