import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  selectedOption: string;
}

@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.scss']
})
export class ModalRolComponent implements OnInit {

  selectedOption!: string;
  @Input() dialogWidth: number = 400; // Valor predeterminado del ancho del diálogo

  @Output() accepted = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }  

  accept() {
    this.accepted.emit(this.selectedOption);
  }

  cancel() {
    this.canceled.emit();
  }

}
