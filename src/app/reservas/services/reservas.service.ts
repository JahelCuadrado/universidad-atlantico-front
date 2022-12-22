import { Injectable } from "@angular/core";
import { HttpParams, HttpClient, HttpHeaders  } from '@angular/common/http';
import { MaterialesComponent } from '../pages/materiales/materiales.component';
import { MaterialesResponse } from '../interfaces/materiales.interface';
import { Observable } from "rxjs";
import { TokenDjango } from '../../login/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservasService{

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

obtenerToken() : TokenDjango{
  return JSON.parse(localStorage.getItem('tokenDjango')!) || "";
}


}
