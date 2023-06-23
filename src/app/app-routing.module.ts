import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { InicioComponent } from './inicio/inicio/inicio.component';


const routes: Routes = [
  {path:"", redirectTo: "inicio",pathMatch:"full"},
 // {path:"listado", component:ListadoComponent},
 //{path:"detalle", component:DetalleComponent}

{path: '', component: InicioComponent,  children: [
    {path:'imicio', loadChildren:()=> import('./inicio/inicio.module').then(mod=> mod.InicioModule)}
  ]
},
{path:'persona', loadChildren:()=> import('./modulo-persona/modulo-persona.module').then(mod=> mod.ModuloPersonaModule)}
]

// const routes: Routes = [
//   {path: '', redirectTo: 'layout', pathMatch: 'full'},
//   // {path: 'List', component: PersonListComponent},
//   // {path: 'detail', component: PersonDetailComponent}
//   { path: 'person', loadChildren: () =>
//       import('./modulo-persona/modulo-persona.module').then(mod => mod.ModuloPersonaModule)},
//   {
//     path: '',
//     component: AdminLayoutComponent,
//     children: [
//       {
//         path: 'layout',
//         loadChildren: () =>
//           import('./modulo-persona/modulo-persona.module').then(mod => mod.ModuloPersonaModule)
//       }
//     ]
//   }
// ]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
