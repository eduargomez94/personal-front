import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

  public pasos: any;

  constructor(
    private readonly activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.pasos = this.activeRoute.snapshot.data;
  }
}
