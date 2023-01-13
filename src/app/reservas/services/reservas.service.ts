import { MaterialesResponse } from './../interfaces/materiales.interface';
import { EquiposResponse } from './../interfaces/equipos.interface';
import { Injectable } from "@angular/core";
import { HttpParams, HttpClient, HttpHeaders  } from '@angular/common/http';
import { MaterialesComponent } from '../pages/materiales/materiales.component';
import { Observable } from "rxjs";
import { TokenDjango } from '../../login/interfaces/token.interface';
import { ClasesResponse } from '../interfaces/clases.interface';
import { Usuario } from '../../login/interfaces/usuario.interface';
import { Reserva } from '../interfaces/reserva.interface';


@Injectable({
  providedIn: 'root'
})
export class ReservasService{

  articulos : (ClasesResponse|EquiposResponse|MaterialesResponse)[] = [];

  constructor(
		private http: HttpClient
  ){}


obtenerMateriales(): Observable<MaterialesResponse[]>{

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.obtenerToken().access}`
    })
  };

  const urlMateriales : string = "http://127.0.0.1:8000/reservas/materiales/";
  return this.http.get<MaterialesResponse[]>(urlMateriales, httpOptions);
}



obtenerEquipos(): Observable<EquiposResponse[]>{

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.obtenerToken().access}`
    })
  };

  const urlMateriales : string = "http://127.0.0.1:8000/reservas/equipos/";
  return this.http.get<EquiposResponse[]>(urlMateriales, httpOptions);
}



obtenerClases(): Observable<ClasesResponse[]>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.obtenerToken().access}`
    })
  };
  const urlMateriales : string = "http://127.0.0.1:8000/reservas/clases/";
  return this.http.get<ClasesResponse[]>(urlMateriales, httpOptions);
}



obtenerToken() : TokenDjango{
  return JSON.parse(localStorage.getItem('tokenDjango')!) || "";
}



anadirArticuloReserva(articulo: MaterialesResponse| ClasesResponse| EquiposResponse){
  this.articulos = JSON.parse(localStorage.getItem('articulos')!) || [];
  this.articulos.push(articulo)
  localStorage.setItem('articulos', JSON.stringify(this.articulos))

  const oldValue = JSON.stringify(this.articulos.slice(0, -1));
  const newValue = JSON.stringify(this.articulos);
  const storageEvent = new StorageEvent('storage', {
    key: 'articulos',
    newValue,
    oldValue,
    url: window.location.href
  });
  window.dispatchEvent(storageEvent);
}



devolverCantidadArticulos(): number{
    this.articulos = JSON.parse(localStorage.getItem('articulos')!) || [];
    console.log(this.articulos.length);
    return this.articulos.length
}



devolverArticulos(): (ClasesResponse|EquiposResponse|MaterialesResponse)[]{
    return JSON.parse(localStorage.getItem('articulos')!) || [];
}



comprobarArticuloReservado(articulo: MaterialesResponse| ClasesResponse| EquiposResponse){
  this.articulos = JSON.parse(localStorage.getItem('articulos')!) || [];

  return this.articulos.some(elemento => {
    if (elemento.hasOwnProperty('inventario') &&
    (elemento as MaterialesResponse).inventario === (articulo as MaterialesResponse).inventario) {
      return true;
    }
    if (elemento.hasOwnProperty('numero_clase') &&
    (elemento as ClasesResponse).numero_clase === (articulo as ClasesResponse).numero_clase) {
      return true;
    }
    if (elemento.hasOwnProperty('id') &&
    (elemento as EquiposResponse).id === (articulo as EquiposResponse).id) {
      return true;
    }
    return false;
  });
}



eliminarArticuloReserva(articulo: MaterialesResponse| ClasesResponse| EquiposResponse){
  this.articulos = JSON.parse(localStorage.getItem('articulos')!) || [];

  this.articulos = this.articulos.filter(elemento => {
    if (elemento.hasOwnProperty('inventario')) {
      return (elemento as MaterialesResponse).inventario != (articulo as MaterialesResponse).inventario;
    }
    if (elemento.hasOwnProperty('numero_clase')) {
      return (elemento as ClasesResponse).numero_clase != (articulo as ClasesResponse).numero_clase;
    }
    if (elemento.hasOwnProperty('id')) {
      return (elemento as EquiposResponse).id != (articulo as EquiposResponse).id;
    }
    return false
  });

  localStorage.setItem('articulos', JSON.stringify(this.articulos))

  const oldValue = JSON.stringify(this.articulos.slice(0, -1));
  const newValue = JSON.stringify(this.articulos);
  const storageEvent = new StorageEvent('storage', {
    key: 'articulos',
    newValue,
    oldValue,
    url: window.location.href
  });
  window.dispatchEvent(storageEvent);
}


eliminarArticulosReserva(){
  localStorage.removeItem('articulos')
}



hacerReserva(): Observable<Reserva>{
  const url = "http://127.0.0.1:8000/reservas/creates/"

  this.articulos               = JSON.parse(localStorage.getItem('articulos')!) || [];
  const usuario : Usuario      = JSON.parse(localStorage.getItem('datosUsuario')!) || "";
  const motivoReserva : string = localStorage.getItem('motivoPrestamo')! || "";

  const date = new Date();
  const today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  const materiales : string[] = [];
  const equipos    : number[] = [];
  const clases     : string[] = [];

  this.articulos.some(elemento => {
    if (elemento.hasOwnProperty('inventario')){
      materiales.push((elemento as MaterialesResponse).inventario)
    }
    if (elemento.hasOwnProperty('numero_clase')) {
      equipos.push((elemento as EquiposResponse).id)
    }
    if (elemento.hasOwnProperty('id')){
      clases.push((elemento as ClasesResponse).numero_clase)
    }
  });

  let reserva = {
     "usuario": usuario.id,
     "motivo_prestamo": motivoReserva,
     "fecha_devolucion": today,
     "devuelto": false,
     "equipo": equipos,
     "clase":clases,
     "material":materiales
   };

   console.log(reserva);


   const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.obtenerToken().access}`
    })
  };

  this.eliminarArticulosReserva()

  this.articulos = JSON.parse(localStorage.getItem('articulos')!) || [];
  console.log(this.articulos);


  const oldValue = JSON.stringify(this.articulos.slice(0, -1));
  const newValue = JSON.stringify(this.articulos);
  const storageEvent = new StorageEvent('storage', {
    key: 'articulos',
    newValue,
    oldValue,
    url: window.location.href
  });
  window.dispatchEvent(storageEvent);

  return this.http.post<Reserva>(url, reserva, httpOptions)

}

guardarMotivoPrestamo(motivo: string){
  localStorage.setItem("motivoPrestamo", motivo)
}


}
