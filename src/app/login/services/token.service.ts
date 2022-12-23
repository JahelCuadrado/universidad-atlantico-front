import { Injectable } from '@angular/core';
import { LoginDjango } from '../interfaces/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDjango } from '../interfaces/token.interface';

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



  guardarToken(token: TokenDjango){
    localStorage.setItem('tokenDjango', JSON.stringify(token))
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
