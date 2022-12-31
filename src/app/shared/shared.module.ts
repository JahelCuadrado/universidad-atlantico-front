import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar/app-bar.component';
import { RouterModule } from '@angular/router';
import { ReservasModule } from '../reservas/reservas.module';



@NgModule({
  declarations: [
    AppBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReservasModule
  ],
  exports:[
    AppBarComponent
  ]
})
export class SharedModule { }
