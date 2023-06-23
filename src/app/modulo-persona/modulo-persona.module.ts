import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';

import { ModuloPersonaRoutingModule } from './modulo-persona-routing.module';

//Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';

//Material navegador de tabla
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DetalleComponent, ListadoComponent],
  imports: [
    CommonModule,
    ModuloPersonaRoutingModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,

    MatProgressSpinnerModule,
    DatePipe,

    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatGridListModule,

    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [DetalleComponent, ListadoComponent],
})
export class ModuloPersonaModule {}
