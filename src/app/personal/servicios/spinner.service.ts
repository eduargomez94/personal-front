import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  cargarSpinner$ = new Subject<boolean>();

  iniciarPantallaDeCarga() {
    this.cargarSpinner$.next(true);
  }

  detenerPantallaDeCarga() {
    this.cargarSpinner$.next(false);
  }
}
