import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuard implements CanActivate {
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}

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
