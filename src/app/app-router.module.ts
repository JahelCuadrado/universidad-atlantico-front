import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesComponent } from './reservas/pages/materiales/materiales.component';
import { EquiposComponent } from './reservas/pages/equipos/equipos.component';
import { ClasesComponent } from './reservas/pages/clases/clases.component';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/pages/login/login.component';
import { RegisterComponent } from './login/pages/register/register.component';
import { MisReservasComponent } from './reservas/pages/mis-reservas/mis-reservas.component';

const routes : Routes = [
  {
    path:'materiales',
    component: MaterialesComponent
  },
  {
    path:'equipos',
    component: EquiposComponent
  },
  {
    path:'clases',
    component: ClasesComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'mis-reservas',
    component: MisReservasComponent
  },
  {
    path:'**',
    redirectTo:'materiales'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRouterModule { }
