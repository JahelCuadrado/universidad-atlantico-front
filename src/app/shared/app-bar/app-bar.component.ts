import { Component } from '@angular/core';
import { TokenService } from '../../login/services/token.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent {

  usuarioLogueado : boolean = false

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.tokenService.comprobarToken()){
          this.usuarioLogueado = true
        }else{
          this.usuarioLogueado = false
        }
      }
    });
  }


  cerrarSesion(){
    this.tokenService.borrarToken()
    this.router.navigate(['/login']);
  }

}
