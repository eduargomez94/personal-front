import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-empleado',
  templateUrl: './modal-empleado.component.html',
  styleUrls: ['./modal-empleado.component.scss'],
})
export class ModalEmpleadoComponent {

  dialogWidth: number = 90;
  @Input() idEmpleado!: number;
  @Output() accepted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  constructor() {}

  onDialogAccepted() {
    this.accepted.emit();
  }

  onDialogCanceled() {
    this.canceled.emit();
  }
}
