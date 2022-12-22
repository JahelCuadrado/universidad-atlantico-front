import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { LoginDjango } from '../../interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted: boolean = false;
  credencialesSonIncorrectas: boolean = true;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router
    ){

      this.loginForm = this.fb.group({
        email_institucional:['', [Validators.required, Validators.email]],
        password:['', Validators.required]
      })
  }

  onSubmit(){
      this.submitted = true

      if(this.loginForm.valid){

            const usuario: LoginDjango = {
              email_institucional: this.loginForm.value.email_institucional,
              password: this.loginForm.value.password,
            }

            this.tokenService.registroUsuario(usuario).subscribe({

              next: (res) => {
                console.log(res);
                this.tokenService.guardarToken(res)
                this.router.navigate(['/materiales'])
              },
              error: (err) => {
                console.log(err);
                this.credencialesSonIncorrectas = false
              }})
      }
  }

  get f(){
    return this.loginForm.controls;
  }

}
