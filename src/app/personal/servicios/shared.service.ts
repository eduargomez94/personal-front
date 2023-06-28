import { Injectable } from '@angular/core';
import { RouteInfo } from '../modelos/menu.modelo';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public titulo: string = "";
  public ROUTES: RouteInfo[] = [];
  public ROUTE_SEL: number = 0;
}
