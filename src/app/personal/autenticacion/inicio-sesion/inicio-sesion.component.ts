import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../servicios/shared.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MensajesService } from '../../servicios/mensajes.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { IRespuestaIngresar, IRespuestaMenus } from '../../modelos/respuesta-general.modelo';
import { StorageDataService } from '../../servicios/storage-data.service';
import { IMenu, ISubmenu } from '../../modelos/menu.modelo';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {

  email!: string;
  password!: string;

  formActivate: FormGroup = new FormGroup({});

  public isDialogOpen = false;
  public dialogWidth = 500;

  constructor(
    public route: Router,
    public sharedService: SharedService,
    public mensajesService: MensajesService,
    public autenticacionService: AutenticacionService,
    public storageDataService: StorageDataService
  ) { }

  ngOnInit(): void {

  }

  enviarIngreso() {
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let error = "";

    if (this.mensajesService.validarVacio(this.email)) {
      error += "Por favor ingresar correo electrónico<br>";
    } else if (!patronCorreo.test(this.email.trim())) {
      error += "Por favor ingresar correo electrónico valido<br>";
    }
    if (this.mensajesService.validarVacio(this.password)) {
      error += "Por favor ingresar contraseña<br>";
    }

    if (error.length !== 0) {
      this.mensajesService.showWarning(error);
    } else {
      this.autenticacionService.ingresar(this.email, this.password).subscribe(
        (respuesta: IRespuestaIngresar<any[]>) => {
          if (!respuesta.esAutenticado) {
            this.mensajesService.showError("Correo electrónico o contraseña incorrectos, por favor validar");
            return;
          }
          if (respuesta.roles.length == 0) {
            this.mensajesService.showError("No tiene asignado rol, por favor validar");
            return;
          }

          this.sharedService.ROLES = respuesta.roles;
          if (this.sharedService.ROLES.length > 1) {
            this.openDialog();            
          } else {
            this.consultarMenus(this.sharedService.ROLES[0].Id_rol);
          }
        },
        (error: any) => {
          this.mensajesService.showError("Error al iniciar sesión, por favor contacta al administrador");
        }
      );
    }
  }

  consultarMenus(id_rol: number) {
    this.autenticacionService.consultarMenus(id_rol).subscribe((respuesta: IRespuestaMenus<any[]>) => {
      if (respuesta.data.length > 0) {
        let menus: IMenu[] = this.convertList(respuesta.data);
        this.sharedService.MENUS = menus;
        this.route.navigateByUrl('/administracion/empleados');
      }
    });
  }

  convertList(data: any[]): IMenu[] {
    const menuItems: IMenu[] = [];

    // Agrupar los elementos por Id_padre
    let rootItems = [];
    let childrenItems = [];
    for (const item of data) {
      const parentId = item.Id_padre;
      if (parentId === null) {
        rootItems.push(item);
      } else {
        childrenItems.push(item);
      }
    }

    for (const item of rootItems) {
      const menuItem: IMenu = {
        title: item.Descripcion,
        link: item.url_menu,
        subItems: this.getSubItems(item.Id_tarea, childrenItems)
      };
      menuItems.push(menuItem);
    }

    return menuItems;
  }

  getSubItems(parentId: number, childrenItems: any[]): ISubmenu[] {
    const subItems: ISubmenu[] = [];
    for (const child of childrenItems) {
      if (child.Id_padre === parentId) {
        const subItem: ISubmenu = {
          title: child.Descripcion,
          link: child.url_menu
        };
        subItems.push(subItem);
      }
    }
    return subItems;
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  onDialogAccepted(id_rol: number) {
    console.log('Opción aceptada:', id_rol);
    this.isDialogOpen = false;
    this.consultarMenus(id_rol);
  }

  onDialogCanceled() {
    this.isDialogOpen = false;
  }
}
