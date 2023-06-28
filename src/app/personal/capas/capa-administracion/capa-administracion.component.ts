import { Component, OnInit, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-administracion",
  templateUrl: "./capa-administracion.component.html",
  styleUrls: ["./capa-administracion.component.scss"],
})
export class CapaAdministracionComponent implements OnInit {
  isMobileResolution: boolean = true;
  public mostrarBarra = true;

  public valorBarraLateral$ = new BehaviorSubject<any>('');

  constructor(
    
  ) {
    this.isMobile();
  }

  @HostListener("window:resize", ["$event"])
  isMobile() {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  ngOnInit() {
    
  }
}
