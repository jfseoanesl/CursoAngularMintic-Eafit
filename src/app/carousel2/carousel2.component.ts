import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaServicesService } from '../services/pelicula-services.service';
import { Pelicula } from '../interface/pelicula';

@Component({
  selector: 'app-carousel2',
  templateUrl: './carousel2.component.html',
  styleUrls: ['./carousel2.component.css']
})
export class Carousel2Component {

  tituloGenero!: string;
  catalogoPeliculas: any;
  viewCatalogo!: any[];
  paramGenero: any;
  carouselActive:string="active";

  peliculas!: Pelicula[];  //=[]  o !    valor nulo
  programador!: Pelicula;


  constructor(private route: ActivatedRoute, private data: PeliculaServicesService) {
  }

  ngOnInit(): void {
        this.data.getPeliculas().subscribe(dbPeliculas => {
          this.peliculas = dbPeliculas;
          this.generatedMatrizPeliculas(this.peliculas);
        });
  }

 

  generatedMatrizPeliculas(catalogo: any[]) {

    var filas = Math.ceil(catalogo.length / 6);
    var matriz: any[] = new Array(filas);
    for (var i = 0; i < filas; i++) {
      var inicio = i * 6;
      var fin = inicio + 5;
      if (fin > catalogo.length) {
        fin = catalogo.length;
      }
      matriz[i] = catalogo.slice(inicio, fin + 1);
    }

    this.viewCatalogo = matriz;

  }

}
