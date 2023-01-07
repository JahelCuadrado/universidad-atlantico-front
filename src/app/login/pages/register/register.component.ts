import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Register } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loginForm: FormGroup;
  submitted : boolean = false;
  credencialesSonIncorrectas: boolean = true;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService
  ){
    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
      email_institucional: ['', [Validators.required, Validators.email]],
      email_personal: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      titulacion: ['', [Validators.required, Validators.maxLength(100)]],
      curso: ['', [Validators.required, Validators.maxLength(1)]],
      contrasena: ['', [Validators.required, Validators.maxLength(100)]],
      repetir_contrasena: ['', [Validators.required, Validators.maxLength(100)]],
    })
  }

  onSubmit(){

    this.submitted = true

    if(this.loginForm.valid &&
      this.loginForm.value.contrasena == this.loginForm.value.repetir_contrasena){

          const usuario: Register = {
            "password":this.loginForm.value.contrasena,
            "username":this.loginForm.value.nombre,
            "first_name":this.loginForm.value.nombre,
            "last_name":this.loginForm.value.apellidos,
            "tipo":"A",
            "nif":this.loginForm.value.dni,
            "email_institucional":this.loginForm.value.email_institucional,
            "email_personal":this.loginForm.value.email_personal,
            "telefono":this.loginForm.value.telefono,
            "curso":this.loginForm.value.curso,
            "titulacion":this.loginForm.value.titulacion
          }

          console.log(usuario);


          this.tokenService.registerUsuario(usuario).subscribe({

              next:(res) =>{
                  console.log(res);

              },

              error:(err) =>{
                  console.log(err);

              }


          })

      }

  }

  get f(){
    return this.loginForm.controls;
  }

}
