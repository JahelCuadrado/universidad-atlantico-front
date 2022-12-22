import { Injectable } from '@angular/core';
import { LoginDjango } from '../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDjango } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  registroUsuario(dataLogin: LoginDjango): Observable<TokenDjango> {

    const url = 'http://127.0.0.1:8000/users/login/';
    const data = dataLogin;

    return this.http.post<TokenDjango>(url, data);
  }

  guardarToken(token: TokenDjango){
    localStorage.setItem('tokenDjango', JSON.stringify(token))
  }


}
