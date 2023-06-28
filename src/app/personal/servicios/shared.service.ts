import { Injectable } from '@angular/core';
import { IMenu, RouteInfo } from '../modelos/menu.modelo';
import { IRoles } from '../modelos/iniciar-sesion.modelo';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public titulo: string = "";
  public ROUTES: RouteInfo[] = [];
  public ROUTE_SEL: number = 0;
  public ROLES: IRoles[] = [];
  public MENUS: IMenu[] = [];
}
