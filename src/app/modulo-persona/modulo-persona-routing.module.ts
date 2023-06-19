import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
  {path:"listado", component:ListadoComponent},
  {path:"detalle/:id", component:DetalleComponent},
  {path:"", redirectTo: "listado",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ModuloPersonaRoutingModule { }
