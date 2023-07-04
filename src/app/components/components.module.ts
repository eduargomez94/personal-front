import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { BarraSuperiorComponent } from "./barra-superior/barra-superior.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalRolComponent } from "./modal-rol/modal-rol.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    BarraSuperiorComponent,
    SpinnerComponent,
    ModalRolComponent
  ],
  exports: [
    BarraSuperiorComponent,
    SpinnerComponent,
    ModalRolComponent
  ],
  providers: []
})
export class ComponentsModule { }

