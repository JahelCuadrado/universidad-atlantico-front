import { MaterialesResponse } from './../interfaces/materiales.interface';
import { EquiposResponse } from './../interfaces/equipos.interface';
import { Injectable } from "@angular/core";
import { HttpParams, HttpClient, HttpHeaders  } from '@angular/common/http';
import { MaterialesComponent } from '../pages/materiales/materiales.component';
import { Observable } from "rxjs";
import { TokenDjango } from '../../login/interfaces/token.interface';
import { ClasesResponse } from '../interfaces/clases.interface';

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
    const articulos: (ClasesResponse|EquiposResponse|MaterialesResponse)[] = JSON.parse(localStorage.getItem('articulos')!) || [];
    return articulos.length
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


}
