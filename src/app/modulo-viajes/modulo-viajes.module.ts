//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

//Propios
import { ModuloViajesRoutingModule } from './modulo-viajes-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';
import { SharedModule } from '../shared/shared.module';

//Angular material
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { PasajerosComponent } from './pasajeros/pasajeros.component';


@NgModule({
  declarations: [
    DetalleComponent,
    ListadoComponent,
    PasajerosComponent
  ],
  imports: [
    CommonModule,
    ModuloViajesRoutingModule,
    DatePipe,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
   MatNativeDateModule
  ],
   exports: [
    DetalleComponent,
    ListadoComponent],
})
export class ModuloViajesModule { }
