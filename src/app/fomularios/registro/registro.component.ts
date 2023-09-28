import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PeliculaServicesService } from 'src/app/services/pelicula-services.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formulario: FormGroup;
  envio: boolean=false;
  response!:any;

  constructor(private db: PeliculaServicesService){
    this.formulario = new FormGroup({
        titulo:new FormControl(),
        sinopsis: new FormControl(),
        img: new FormControl(),
        anio: new FormControl(),
        estreno:new FormControl(),
        genero: new FormControl()

    });
  
  }
  ngOnInit(): void { }

  async enviarFormulario(){

    try{

      this.response = await this.db.addPelicula(this.formulario.value);
      this.formulario.reset();
      this.envio=true;

      setTimeout( ()=>{ this.envio==false}, 5000 );

    }catch{
      this.envio=false;
    }
  }

}
