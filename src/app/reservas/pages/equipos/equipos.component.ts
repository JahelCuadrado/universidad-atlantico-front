import { Component } from '@angular/core';
import { EquiposResponse } from '../../interfaces/equipos.interface';
import { ReservasService } from '../../services/reservas.service';
import { TokenService } from 'src/app/login/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {

  equipos : EquiposResponse[] = [];

  constructor(
    private reservasService: ReservasService,
    private tokenService : TokenService,
    private router: Router){

  }

  ngOnInit(){
    if(this.tokenService.comprobarToken() != ""){
      this.refrescarToken()
    }
    this.obtenerEquipos()
  }


  refrescarToken(){
    this.tokenService.refrescarToken()
  }


  obtenerEquipos(){
    this.reservasService.obtenerEquipos().subscribe({

      next: (resp) => {
          this.equipos = resp
          console.log(resp);
      },

      error: (error) => {
          console.log("Error");
          console.info(error)
          this.router.navigate(['/login'])

      }})

    }


    anadirArticuloReserva(equipo: EquiposResponse){
      this.reservasService.anadirArticuloReserva(equipo)
    }



    comprobarReserva(equipo: EquiposResponse): boolean{
      return this.reservasService.comprobarArticuloReservado(equipo);

    }

}
