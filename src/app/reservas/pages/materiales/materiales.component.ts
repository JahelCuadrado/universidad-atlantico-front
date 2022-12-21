import { Component } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { MaterialesResponse } from '../../interfaces/materiales.interface';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent {

  materiales : MaterialesResponse[] = []

  constructor( private reservasService: ReservasService){

  }

  ngOnInit(): void {
      this.reservasService.obtenerMateriales().subscribe({

      next: (resp) => {
        this.materiales = resp
          console.log(resp);
      },

      error: (error) => {
          console.log("Error");
          console.info(error)

      }
    }
    )
  }





  }
