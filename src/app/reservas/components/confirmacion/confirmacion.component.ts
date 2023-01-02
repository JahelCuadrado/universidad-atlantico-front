import { Component } from '@angular/core';
import { MaterialesResponse } from '../../interfaces/materiales.interface';
import { ClasesResponse } from '../../interfaces/clases.interface';
import { EquiposResponse } from '../../interfaces/equipos.interface';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {


  articulos: (MaterialesResponse|ClasesResponse|EquiposResponse)[] = [];


  constructor(
    private reservasService: ReservasService
  ){}


  ngOnInit(): void {
        this.articulos = this.reservasService.devolverArticulos()

    window.addEventListener('storage', event => {
      if (event.key === 'articulos') {
          this.articulos = this.reservasService.devolverArticulos()
      }
    });

  }


  eliminarReserva(articulo: MaterialesResponse|ClasesResponse|EquiposResponse){
      this.reservasService.eliminarArticuloReserva(articulo);
  }



  comprobarArticuloReservado(articulo: MaterialesResponse|ClasesResponse|EquiposResponse){
        return this.reservasService.comprobarArticuloReservado(articulo)
  }



  hacerReserva(){
      
  }


}
