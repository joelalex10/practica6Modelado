import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EjericioMaquinasComponent} from "./ejericio-maquinas/ejericio-maquinas.component";

const routes: Routes = [
  {
    path: 'ejercicio-maquinas',
    component: EjericioMaquinasComponent,
  },
  {
    path: '**',
    redirectTo:'ejercicio-maquinas',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
