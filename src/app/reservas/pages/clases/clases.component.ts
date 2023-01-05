import { Component } from '@angular/core';
import { ClasesResponse } from '../../interfaces/clases.interface';
import { ReservasService } from '../../services/reservas.service';
import { TokenService } from 'src/app/login/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {

  clases : ClasesResponse[] = [];

  constructor(
    private reservasService: ReservasService,
    private tokenService : TokenService,
    private router: Router){

  }

  ngOnInit(){
    if(this.tokenService.comprobarToken() != ""){
      this.refrescarToken();
    }
    this.obtenerClases();
  }


  refrescarToken(){
    this.tokenService.refrescarToken();
  }


  obtenerClases(){
    this.reservasService.obtenerClases().subscribe({

      next: (resp) => {
          this.clases = resp
          console.log(resp);
      },

      error: (error) => {
          console.log("Error");
          console.info(error)
          this.router.navigate(['/login'])

      }})
    }


    anadirArticuloReserva(clase: ClasesResponse){
      this.reservasService.anadirArticuloReserva(clase)
    }



    comprobarReserva(clase: ClasesResponse): boolean{
      return this.reservasService.comprobarArticuloReservado(clase);

    }

}
