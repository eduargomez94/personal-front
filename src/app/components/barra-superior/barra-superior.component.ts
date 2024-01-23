import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { IMenu } from 'src/app/personal/modelos/menu.modelo';
import { StorageService } from 'src/app/personal/servicios/storage.service';
declare const $: any;

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss'],
})
export class BarraSuperiorComponent implements OnInit {
  public menuItems!: IMenu[];
  activeItem: number = 0;
  activeSubItem: number = 0;

  constructor(
    location: Location,
    private readonly router: Router,
    public storageService: StorageService
  ) {}

  ngOnInit() {
    this.menuItems = this.storageService.listarMenus();
    console.log(this.menuItems);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/ingresar']);
  }
}
