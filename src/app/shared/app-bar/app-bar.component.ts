import { Component } from '@angular/core';
import { TokenService } from '../../login/services/token.service';
import { NavigationEnd, Router, Event } from '@angular/router';
import { ReservasService } from '../../reservas/services/reservas.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {

  usuarioLogueado : boolean = false;
  botonLoginHabilitado : boolean = false;
  botonRegisterHabilitado : boolean = false;
  cantidadArticulos : number = 0;
  misReservas : boolean = true;

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

        console.log(this.router.routerState.snapshot.url);
        if(this.router.routerState.snapshot.url == "/register"){
          this.botonRegisterHabilitado = false
          this.botonLoginHabilitado = true
        }
        if(this.router.routerState.snapshot.url == "/login"){
          this.botonRegisterHabilitado = true
          this.botonLoginHabilitado = false
        }else{
          this.botonRegisterHabilitado = false
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

  habilitarReservas(event: any){
    this.misReservas = event.value
  }


}
