import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Register } from '../../interfaces/register.interface';
import { Titulacion } from '../../interfaces/titulacion.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  loginForm: FormGroup;
  submitted : boolean = false;
  registerCorrecto: boolean = false;
  errorDeRegistro: boolean = false;
  titulaciones : Titulacion[] = [];
  cursoTitulacion: number[] = [];
  cursoSeleccionado! : Titulacion;




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
      titulacion: ['defecto', [Validators.required, Validators.maxLength(100)]],
      curso: ['defecto', [Validators.required, Validators.maxLength(1)]],
      contrasena: ['', [Validators.required, Validators.maxLength(100)]],
      repetir_contrasena: ['', [Validators.required, Validators.maxLength(100)]],
    })
  }


  ngOnInit(): void {
    this.tokenService.obtenerTitulaciones().subscribe({

        next: (resp) => {
          console.log(resp);

            this.titulaciones = resp;
        },

        error: (err) => {
            console.log("Ha fallado la petición de las titulaciones");

        }

    })
  }



  onSubmit(){

    console.log("SUBMIT LANZADOOOOOOOOO");

    this.submitted = true

    console.log(this.loginForm.valid);
    console.log(this.loginForm.value.contrasena);
    console.log(this.loginForm.value.repetir_contrasena);

    for (const key in this.loginForm.controls) {
      const control = this.loginForm.get(key);
      if (control!.invalid) {
        console.log(key + ' is invalid');
      }
    }


    if(this.loginForm.valid &&
      this.loginForm.value.contrasena == this.loginForm.value.repetir_contrasena){

          const titulacion = JSON.parse(this.loginForm.value.titulacion)

          const usuario: Register = {
            "password":this.loginForm.value.contrasena,
            "username":this.loginForm.value.nombre,
            "first_name":this.loginForm.value.nombre,
            "last_name":this.loginForm.value.apellidos,
            "tipo":'A',
            "nif":this.loginForm.value.dni,
            "email_institucional":this.loginForm.value.email_institucional,
            "email_personal":this.loginForm.value.email_personal,
            "telefono":this.loginForm.value.telefono,
            "curso":this.loginForm.value.curso,
            "titulacion":titulacion.id
          }

          console.log(usuario);


          this.tokenService.registerUsuario(usuario).subscribe({

              next:(res) =>{
                  this.registerCorrecto = true
                  this.errorDeRegistro = false
                  console.log(res);

              },

              error:(err) =>{
                this.registerCorrecto = false
                this.errorDeRegistro = true
                console.log(err);

              }
            })}



        }


  cursoEnAnos(event: any){
    const titulacion = JSON.parse(event.target.value)
    console.log(titulacion.id);

    console.log(titulacion);
    this.cursoTitulacion = Array.from({ length: titulacion.duracion }, (v, i) => i + 1);
  }



  get f(){
    return this.loginForm.controls;
  }




}
