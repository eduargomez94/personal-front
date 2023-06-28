import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageDataService } from '../servicios/storage-data.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(private readonly storageService: StorageDataService, private readonly router: Router) { }

  /**
    * Katary Software Factory
    * @author: Ivonne C. Barco
    */
  canActivate(): boolean {
    if (!this.storageService.usuarioActivo()) {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/ingresar']);
      return false;
    }
    return true;
  }

}
