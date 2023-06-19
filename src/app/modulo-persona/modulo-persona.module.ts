import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { FormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';
import { ModuloPersonaRoutingModule } from './modulo-persona-routing.module';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    DetalleComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    ModuloPersonaRoutingModule,
    FormsModule,
    MatButtonModule

  ],
  exports:[DetalleComponent,ListadoComponent]
})
export class ModuloPersonaModule { }
