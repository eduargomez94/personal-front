import { Component, OnInit } from "@angular/core";
import {
  Router
} from "@angular/router";
import {
  Location
} from "@angular/common";

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

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/ingresar']);
  }
}
