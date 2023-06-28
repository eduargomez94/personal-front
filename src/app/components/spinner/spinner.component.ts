import { Component } from '@angular/core';
import { SpinnerService } from '../../personal/servicios/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  cargarSpinner$ = this.spinnerServices.cargarSpinner$;

  constructor(private readonly spinnerServices: SpinnerService) { }

}
