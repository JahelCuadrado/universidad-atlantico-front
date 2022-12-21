import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar/app-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AppBarComponent
  ]
})
export class SharedModule { }
