
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../inicio/inicio/inicio.component';
import { ListadoComponent } from '../modulo-persona/listado/listado.component';
import { DetalleComponent } from '../modulo-persona/detalle/detalle.component';

const routes: Routes = [
  {path:"", redirectTo: "inicio",pathMatch:"full"},
  {path:"inicio", component:InicioComponent},
  {path:"persona/listado", component:ListadoComponent},
  {path:"persona/alta", component:DetalleComponent},
  {path:"persona/detalle/:id", component:DetalleComponent},

  {path:'persona', loadChildren:()=> import('./../modulo-persona/modulo-persona.module').then(mod=> mod.ModuloPersonaModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
