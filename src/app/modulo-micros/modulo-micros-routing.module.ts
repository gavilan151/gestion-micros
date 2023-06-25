import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { InicioComponent } from '../inicio/inicio/inicio.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {path:"", redirectTo: "inicio",pathMatch:"full"},
  {path:"inicio", component:InicioComponent},
  {path:"listado", component:ListadoComponent},
  {path:"alta", component:DetalleComponent},
  {path:"detalle/:id", component:DetalleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloMicrosRoutingModule { }
