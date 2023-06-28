import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { CapaAdministracionComponent } from './personal/capas/capa-administracion/capa-administracion.component';
import { CapaAutenticacionComponent } from './personal/capas/capa-autenticacion/capa-autenticacion.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CapaAdministracionComponent,
    CapaAutenticacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
