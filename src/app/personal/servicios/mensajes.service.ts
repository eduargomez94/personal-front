import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  constructor(private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  showSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Éxito', { enableHtml: true });
  }

  showError(mensaje: string) {
    this.toastr.error(mensaje, 'Error', { enableHtml: true });
  }

  showInfo(mensaje: string) {
    this.toastr.info(mensaje, 'Información', { enableHtml: true });
  }

  showWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', { enableHtml: true });
  }

  validarVacio(texto: string) {
    if (texto === null || texto === undefined || texto.trim().length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
