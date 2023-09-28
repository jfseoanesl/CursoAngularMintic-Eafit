import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pelicula } from 'src/app/interface/pelicula';
import { PeliculaServicesService } from 'src/app/services/pelicula-services.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{
  formulario: FormGroup;
  catalogo!: Pelicula[];
  pelicula!:Pelicula;
  
  constructor(private data : PeliculaServicesService){

    this.formulario = new FormGroup({
      genero: new FormControl()

  });

  }

  ngOnInit(): void {
    
    this.data.getPeliculas().subscribe(
      (db)=>{
        this.catalogo = db;
      }
    );

  }

  filrar(): void{
     
    var filtroGenero: string = this.formulario.get("genero")?.value;
    this.data.getPeliculaPorGenero(filtroGenero).subscribe(

      db_peliculas => {
      this.catalogo = db_peliculas;
      
    }
    );
  }

  onClickDeleteConfirm() {
      
    const respuesta = this.data.deleteProgramador(this.pelicula);
 
}

onClickSelect(pelicula: Pelicula) {
 
  this.pelicula=pelicula;
}

}
