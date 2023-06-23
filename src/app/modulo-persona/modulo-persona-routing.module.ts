import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { ListadoComponent } from './listado/listado.component';
import { InicioComponent } from '../inicio/inicio/inicio.component';

const routes: Routes = [
  {path:"", redirectTo: "inicio",pathMatch:"full"},
  {path:"inicio", component:InicioComponent},
  {path:"persona/listado", component:ListadoComponent},
  {path:"persona/alta", component:DetalleComponent},
  {path:"persona/detalle/:id", component:DetalleComponent},

  {path:'persona', loadChildren:()=> import('./modulo-persona.module').then(mod=> mod.ModuloPersonaModule)}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ModuloPersonaRoutingModule { }
