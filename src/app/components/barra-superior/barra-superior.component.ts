import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";
import {
  Location
} from "@angular/common";

import { FormControl } from "@angular/forms";
import { SharedService } from "src/app/personal/servicios/shared.service";
import { IMenu } from "src/app/personal/modelos/menu.modelo";
declare const $: any;


@Component({
  selector: "app-barra-superior",
  templateUrl: "./barra-superior.component.html",
  styleUrls: ["./barra-superior.component.scss"],
})
export class BarraSuperiorComponent implements OnInit {
  public menuItems!: IMenu[];
  activeItem: number = 0;
  activeSubItem: number = 0;

  constructor(
    location: Location,
    private readonly router: Router,
    public sharedService: SharedService
  ) {
  }

  ngOnInit() {
    this.menuItems = this.sharedService.MENUS;
  }

  /*menuItems = [
    {
      title: 'Inicio',
      link: '/home',
      subItems: []
    },
    {
      title: 'Productos',
      link: '/products',
      subItems: [
        { title: 'Producto 1', link: '/products/1' },
        { title: 'Producto 2', link: '/products/2' },
        { title: 'Producto 3', link: '/products/3' }
      ]
    },
    {
      title: 'Servicios',
      link: '/services',
      subItems: [
        { title: 'Servicio 1', link: '/services/1' },
        { title: 'Servicio 2', link: '/services/2' },
        { title: 'Servicio 3', link: '/services/3' }
      ]
    }
  ];*/

  logout() {
    // Lógica para cerrar sesión
  }
}
