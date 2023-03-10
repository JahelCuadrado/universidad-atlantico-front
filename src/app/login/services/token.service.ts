import { Injectable } from '@angular/core';
import { LoginDjango } from '../interfaces/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDjango } from '../interfaces/token.interface';
import { Register } from '../interfaces/register.interface';
import { Titulacion } from '../interfaces/titulacion.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }



  loginUsuario(dataLogin: LoginDjango): Observable<TokenDjango> {
    const url = 'http://127.0.0.1:8000/users/login/';
    const data = dataLogin;
    return this.http.post<TokenDjango>(url, data);
  }



  registerUsuario(dataRegister: Register): Observable<TokenDjango> {
    const url = 'http://127.0.0.1:8000/users/register/';
    const data = dataRegister;
    return this.http.post<TokenDjango>(url, data);
  }



  guardarToken(token: TokenDjango){
    localStorage.setItem('tokenDjango', JSON.stringify(token))
  }



  obtenerTitulaciones(): Observable<Titulacion[]>{
      const url = 'http://localhost:8000/users/titulaciones/';
      return this.http.get<Titulacion[]>(url);
  }



  obtenerDatosUsuario(){
    let token = JSON.parse(localStorage.getItem('tokenDjango')!) || "";
    const url = "http://localhost:8000/users/me/"

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token.access}`
      })
    };

    this.http.get(url, httpOptions).subscribe({

      next: (resp) =>{
          localStorage.setItem("datosUsuario", JSON.stringify(resp))
      },

      error: (err) => {
          console.log(err);

      }

    })
  }



  refrescarToken(){
    const url = 'http://localhost:8000/users/token/refresh/'
    let token = JSON.parse(localStorage.getItem('tokenDjango')!) || "";

    if(token!=""){

      let data = {
        'refresh': `${token.refresh}`
      }

      this.http.post<TokenDjango>(url, data).subscribe({
          next: (resp) => {
            localStorage.setItem('tokenDjango', JSON.stringify(resp))
          },
          error: (error) => {
            console.log(token.refresh);
          }
      })}
  }


  comprobarToken() : string{
      return JSON.parse(localStorage.getItem('tokenDjango')!) || "";
  }


  borrarToken(){
    localStorage.removeItem('tokenDjango');
  }


}
