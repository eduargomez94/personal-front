import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { IRoles } from 'src/app/personal/modelos/iniciar-sesion.modelo';
import { StorageService } from 'src/app/personal/servicios/storage.service';

@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.scss'],
})
export class ModalRolComponent implements OnInit {
  listaRoles!: IRoles[];

  selectedOption!: number;
  @Input() dialogWidth: number = 400; // Valor predeterminado del ancho del diálogo

  @Output() accepted = new EventEmitter<number>();
  @Output() canceled = new EventEmitter<void>();

  constructor(public storageService: StorageService) {}

  ngOnInit(): void {
    this.listaRoles = this.storageService.listarRoles();
  }

  accept() {
    this.accepted.emit(this.selectedOption);
  }

  cancel() {
    this.canceled.emit();
  }
}
