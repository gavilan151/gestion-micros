//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

//Propios
import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';
import { ModuloPersonaRoutingModule } from './modulo-persona-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [DetalleComponent, ListadoComponent],
  imports: [
    CommonModule,
    ModuloPersonaRoutingModule,
    DatePipe,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,

  ],
  exports: [
    DetalleComponent,
    ListadoComponent],
})

export class ModuloPersonaModule {}
