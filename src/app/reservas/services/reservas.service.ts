import { Injectable } from "@angular/core";
import { HttpParams, HttpClient, HttpHeaders  } from '@angular/common/http';
import { MaterialesComponent } from '../pages/materiales/materiales.component';
import { MaterialesResponse } from '../interfaces/materiales.interface';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservasService{

  constructor(
		private http: HttpClient
  ){}


    token : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxNjE5Mjg0LCJpYXQiOjE2NzE2MTEyOTMsImp0aSI6IjhlODk4NmZkZDVkMjQxOTJhNzdlNDFhNGQ1MjFjZDJlIiwidXNlcl9pZCI6M30.QmhZSUsYmwzscDkP8rwvfjNlL7_zH3IjzlSACJxoCV4'



obtenerMateriales(): Observable<MaterialesResponse[]>{

  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  const urlMateriales : string = "http://127.0.0.1:8000/reservas/materiales/";
  return this.http.get<MaterialesResponse[]>(urlMateriales, httpOptions);
}


}
