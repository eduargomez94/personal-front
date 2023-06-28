import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FooterComponent } from "./footer/footer.component";

import { RouterModule } from "@angular/router";
import { BarraSuperiorComponent } from "./barra-superior/barra-superior.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalRolComponent } from "./modal-rol/modal-rol.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    FooterComponent,
    BarraSuperiorComponent,
    SpinnerComponent,
    ModalRolComponent
  ],
  exports: [
    FooterComponent,
    BarraSuperiorComponent,
    SpinnerComponent,
    ModalRolComponent
  ],
  providers: []
})
export class ComponentsModule { }

