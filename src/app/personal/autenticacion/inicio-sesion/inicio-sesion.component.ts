import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../servicios/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalRolComponent } from 'src/app/components/modal-rol/modal-rol.component';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {

  public isDialogOpen = false;
  public dialogWidth = 500;

  constructor(
    public route: Router,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {

  }

  redireccionarIngreso() {
    //this.route.navigateByUrl('/administracion/simulador/registro');
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  onDialogAccepted(option: any) {
    console.log('Opción aceptada:', option);
    this.isDialogOpen = false;
    this.route.navigateByUrl('/administracion/simulador/registro');
  }

  onDialogCanceled() {
    console.log('Diálogo cancelado');
    this.isDialogOpen = false;
  }
}
