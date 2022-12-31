import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesComponent } from './pages/materiales/materiales.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';



@NgModule({
  declarations: [
    MaterialesComponent,
    EquiposComponent,
    ClasesComponent,
    ConfirmacionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    ConfirmacionComponent
  ]
})
export class ReservasModule { }
