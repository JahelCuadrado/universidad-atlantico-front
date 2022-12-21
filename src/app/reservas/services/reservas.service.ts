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


    token : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxNjE0ODkzLCJpYXQiOjE2NzE2MTEyOTMsImp0aSI6ImJlYzgxYjY1MmE3ZTQzYTE4NzkyN2E0NGZiMDEyYmJjIiwidXNlcl9pZCI6M30.ZIKtFmtoJsi78YP2LlPVLiYkEtVxyfdOy4PlrIpuWeg'



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
