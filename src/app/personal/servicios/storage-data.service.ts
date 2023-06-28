import { Injectable } from '@angular/core';
import { IFactoresSeleccionados } from '../modelos/genericos.modelo';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  guardarListaBeneficiarios(lista: any[]) {
    sessionStorage.setItem('BENEFICIARIOS', JSON.stringify(lista));
  }

  async listarBeneficiarios(cambiarGenero: boolean): Promise<any[]> {
    return new Promise((resolve) => {
      let lista = [];
      if (sessionStorage.getItem('BENEFICIARIOS')) {
        lista = JSON.parse(sessionStorage.getItem('BENEFICIARIOS') + "");
        if (cambiarGenero) {
          for (const item of lista) {
            if (item.genero === 'M') {
              item.genero = 'Hombre';
            } else {
              item.genero = 'Mujer';
            }
          }
        }
        resolve(lista);
      } else {
        resolve([]);
      }
    });
  }

  listarBeneficiariosTotales() {
    if (sessionStorage.getItem('BENEFICIARIOS')) {
      return JSON.parse(sessionStorage.getItem('BENEFICIARIOS') + "");
    } else {
      return [];
    }
  }

  eliminarListaBeneficiarios() {
    sessionStorage.removeItem('BENEFICIARIOS');
  }

  guardarRegionSeleccionada(valor: string) {
    sessionStorage.setItem('COD_REGION', valor);
  }

  listarRegionSeleccionada() {
    if (sessionStorage.getItem('COD_REGION')) {
      return sessionStorage.getItem('COD_REGION');
    } else {
      return '';
    }
  }

  eliminarRegionSeleccionada() {
    sessionStorage.removeItem('COD_REGION');
  }


  guardarFactoresSeleccionados(factores: any[]) {
    sessionStorage.setItem('FACTORES_COMPARAR', JSON.stringify(factores));
  }

  eliminarListaFactoresSeleccionados() {
    sessionStorage.removeItem('FACTORES_COMPARAR');
  }

  listarFactoresSeleccionados(): any[] {
    if (sessionStorage.getItem('FACTORES_COMPARAR')) {
      return JSON.parse(sessionStorage.getItem('FACTORES_COMPARAR') + "");
    } else {
      return [];
    }
  }

  eliminarFactorSeleccioadoPorCodigo(codigoFactores: string): IFactoresSeleccionados[] {
    const lista = this.listarFactoresSeleccionados();
    const nuevaLista = lista.filter((item) => item.codigoFactores !== codigoFactores);
    this.guardarFactoresSeleccionados(nuevaLista)
    return nuevaLista;
  }

  guardarProductosSeleccionados(productos: any[]) {
    sessionStorage.setItem('PRODUCTOS_SEL', JSON.stringify(productos));
  }

  listarProductosSeleccionados(): any[] {
    if (sessionStorage.getItem('PRODUCTOS_SEL')) {
      return JSON.parse(sessionStorage.getItem('PRODUCTOS_SEL') + "");
    } else {
      return [];
    }
  }

  guardarTipoCotizacion(esPersonalizada: boolean) {
    sessionStorage.setItem('ES_PERSONALIZADA', esPersonalizada.toString());
  }

  eliminarTipoCotizacion(): void {
    sessionStorage.removeItem('ES_PERSONALIZADA');
  }

  obtenerTipoCotizacion(): boolean {
    if (sessionStorage.getItem('ES_PERSONALIZADA')) {
      const constante = sessionStorage.getItem('ES_PERSONALIZADA') + "";
      return constante.toLowerCase() === 'true' ? true : false;
    } else {
      return false;
    }
  }

  guardarInfoCotizador(datosCotizacion: any) {
    sessionStorage.setItem('INFO_COTIZADOR', JSON.stringify(datosCotizacion));
  }

  listarInfoCotizador(): any[] {
    if (sessionStorage.getItem('INFO_COTIZADOR')) {
      return JSON.parse(sessionStorage.getItem('INFO_COTIZADOR') + "");
    } else {
      return [];
    }
  }

  guardarEmpresaPlan(empresaPlan: any[]) {
    sessionStorage.setItem('EMPRESA_PLAN', JSON.stringify(empresaPlan));
  }

  listarEmpresaPlan(): any[] {
    if (sessionStorage.getItem('EMPRESA_PLAN')) {
      return JSON.parse(sessionStorage.getItem('EMPRESA_PLAN') + "");
    } else {
      return [];
    }
  }

  eliminarListaEmpresaPlan(): void {
    sessionStorage.removeItem('EMPRESA_PLAN');
  }

  getToken(): string {
    return localStorage.getItem('TK_SALUD') + "";
  }

  usuarioActivo(): boolean {
    return !!this.getToken();
  }

  guardarListaPlanes(lista: any[]) {
    sessionStorage.setItem('PLANES', JSON.stringify(lista));
  }

  obtenerListaPlanes() {
    let lista = [];
    if (sessionStorage.getItem('PLANES')) {
      lista = JSON.parse(sessionStorage.getItem('PLANES') + "");
      return lista;
    } else {
      return [];
    }
  }

}
