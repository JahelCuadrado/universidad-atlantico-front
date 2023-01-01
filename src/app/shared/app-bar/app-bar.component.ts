import { Component } from '@angular/core';
import { TokenService } from '../../login/services/token.service';
import { NavigationEnd, Router } from '@angular/router';
import { ReservasService } from '../../reservas/services/reservas.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {

  usuarioLogueado : boolean = false;
  cantidadArticulos : number = 0;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private reservasService: ReservasService
  ){

  }

  ngOnInit(){

    this.cantidadArticulos = this.reservasService.devolverCantidadArticulos();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.tokenService.comprobarToken()){
          this.usuarioLogueado = true
        }else{
          this.usuarioLogueado = false
        }
      }
    });

    window.addEventListener('storage', event => {
      if (event.key === 'articulos') {

          this.cantidadArticulos = this.reservasService.devolverCantidadArticulos();
      }
    });

  }


  cerrarSesion(){
    this.tokenService.borrarToken()
    this.router.navigate(['/login']);
  }

}
