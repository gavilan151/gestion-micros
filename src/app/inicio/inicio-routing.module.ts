
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../inicio/inicio/inicio.component';
import { ListadoComponent } from '../modulo-persona/listado/listado.component';
import { DetalleComponent } from '../modulo-persona/detalle/detalle.component';

const routes: Routes = [
  {path:"", redirectTo: "inicio",pathMatch:"full"},
  {path:"inicio", component:InicioComponent},
  // {path:"listado", component:ListadoComponent},
  // {path:"alta", component:DetalleComponent},
  // {path:"persona/detalle/:id", component:DetalleComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
