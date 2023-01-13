import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialesResponse } from '../../interfaces/materiales.interface';
import { ClasesResponse } from '../../interfaces/clases.interface';
import { EquiposResponse } from '../../interfaces/equipos.interface';
import { ReservasService } from '../../services/reservas.service';
import { Event, Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {


  articulos: (MaterialesResponse|ClasesResponse|EquiposResponse)[] = [];
  debouncerMotivoPrestamo : Subject<string> = new Subject();
  @Output() misReservas : EventEmitter<Boolean> = new EventEmitter();
  dato! : string;
  botonDesabilitado="disabled"
  reservaRealizada: boolean = false;
  numeroCaracteres : number = 0;

  constructor(
    private reservasService: ReservasService,
    private router: Router
  ){}


  ngOnInit(): void {

    this.debouncerMotivoPrestamo
    .pipe(debounceTime(300))
    .subscribe( valor => {
      this.reservasService.guardarMotivoPrestamo(valor)
      this.numeroCaracteres = valor.length
      if(valor.length > 35){
        this.botonDesabilitado=""
      }else{
        this.botonDesabilitado="disabled"
      }

    })

    this.articulos = this.reservasService.devolverArticulos()

    window.addEventListener('storage', event => {
      if (event.key === 'articulos') {
          this.articulos = this.reservasService.devolverArticulos()
      }
    });

  }


  eliminarReserva(articulo: MaterialesResponse|ClasesResponse|EquiposResponse){
      this.reservasService.eliminarArticuloReserva(articulo);
      console.log(this.articulos);

  }



  comprobarArticuloReservado(articulo: MaterialesResponse|ClasesResponse|EquiposResponse){
        return this.reservasService.comprobarArticuloReservado(articulo)
  }


  hacerReserva(){
      this.reservasService.hacerReserva().subscribe({

        next: (resp) => {
          console.log(resp);
          this.reservasService.eliminarArticulosReserva()
          this.reservaRealizada = true
          this.router.navigate(['/materiales']);
          this.misReservas.emit(true)
        },
        error: (err) => {

        }
       })


  }

  motivoPrestamo(){
    this.debouncerMotivoPrestamo.next(this.dato)
  }


}
