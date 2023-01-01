import { Component } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { MaterialesResponse } from '../../interfaces/materiales.interface';
import { TokenService } from '../../../login/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent {

  materiales : MaterialesResponse[] = []

  constructor(
    private reservasService: ReservasService,
    private tokenService : TokenService,
    private router: Router){

  }



  ngOnInit(){
    if(this.tokenService.comprobarToken() != ""){
      this.refrescarToken()
    }
    this.obtenerMateriales()
  }



  refrescarToken(){
    this.tokenService.refrescarToken()
  }



  obtenerMateriales(){
    this.reservasService.obtenerMateriales().subscribe({

      next: (resp) => {
          this.materiales = resp
          console.log(resp);
      },

      error: (error) => {
          console.log("Error");
          console.info(error)
          this.router.navigate(['/login'])

      }})
    }



  anadirArticuloReserva(material: MaterialesResponse){
    this.reservasService.anadirArticuloReserva(material)
  }



  comprobarReserva(material: MaterialesResponse): boolean{
    return this.reservasService.comprobarArticuloReservado(material)
  }



}
