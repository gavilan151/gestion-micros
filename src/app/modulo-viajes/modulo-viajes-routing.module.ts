import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {path:"", redirectTo: "inicio",pathMatch:"full"},
  {path:"listado", component:ListadoComponent},
  {path:"alta", component:DetalleComponent},
  {path:"detalle/:id", component:DetalleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloViajesRoutingModule { }
