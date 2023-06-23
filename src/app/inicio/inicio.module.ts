import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio/inicio.component';

import { ModuloPersonaModule } from '../modulo-persona/modulo-persona.module';



@NgModule({
  declarations: [
    InicioComponent,


  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ModuloPersonaModule

  ],
  exports: [InicioComponent],
})
export class InicioModule { }
