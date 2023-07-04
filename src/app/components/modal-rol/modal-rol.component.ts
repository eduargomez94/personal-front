import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { IRoles } from 'src/app/personal/modelos/iniciar-sesion.modelo';
import { SharedService } from 'src/app/personal/servicios/shared.service';

@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.scss']
})
export class ModalRolComponent implements OnInit {

  listaRoles!: IRoles[];

  selectedOption!: number;
  @Input() dialogWidth: number = 400; // Valor predeterminado del ancho del diálogo

  @Output() accepted = new EventEmitter<number>();
  @Output() canceled = new EventEmitter<void>();

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
    this.listaRoles = this.sharedService.ROLES;
  }

  accept() {
    this.accepted.emit(this.selectedOption);
  }

  cancel() {
    this.canceled.emit();
  }

}
