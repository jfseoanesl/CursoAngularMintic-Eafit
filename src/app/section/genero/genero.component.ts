import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pelicula } from 'src/app/interface/pelicula';
import { PeliculaServicesService } from 'src/app/services/pelicula-services.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  tituloGenero!: string;
  catalogoPeliculas: any;
  viewCatalogo!: any[];
  paramGenero: any;

  peliculas!: Pelicula[];  //=[]  o !    valor nulo
  programador!: Pelicula;


  constructor(private route: ActivatedRoute, private data: PeliculaServicesService) {

    
    this.catalogoPeliculas = [
      {
        titulo: "Barbie",
        sinopsis: "Vivir en Barbie Land es ser un ser perfecto en un lugar perfecto, a menos que tengas una crisis existencial total, o seas un Ken. Es una muñeca encantadora",
        img: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/649d95d788a64f00088e298f/common/barbie-94082-1688049563959.png",
        año: 2022,
        genero: "infantil",
        estreno: false
      },
      {
        titulo: "La hada de los dientes",
        sinopsis: "Cuando Violetta pierde de forma catastrófica su examen de hada de los dientes, la traviesa criatura no acepta el resultado y se cuela en el mundo " +
          "de los humanos. ...",
        img: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/64f60906a49c6900085dc179/common/la-hada-de-los-dientes-94832-1693846318809.jpg",
        año: 2022,
        genero: "infantil",
        estreno: true
      },
      {
        titulo: "Cachorros Espaciales",
        sinopsis: "Dos niños pequeños y sus padres ayudan a un trío de extraterrestres transformados en perros amigables a escapar de las garras de un cazador de ovnis ...",
        img: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/64f0e4a1cc6e4d00085c5d26/common/cachorros-espaciales-100370-1693510056569.jpg",
        año: 2022,
        genero: "infantil",
        estreno: false
      },
      {
        titulo: "Trolls 3",
        sinopsis: "Este año, prepárate para un reencuentro familiar llena de acción, estrellas y colores como ninguna otra, ya que Anna Kendrick y Justin Timberlake regresan para ...",
        img: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/64b1c3f599f8180008eecb30/common/trolls-3-100341-1689701479191.jpg",
        año: 2023,
        genero: "infantil",
        estreno: true
      },
      {
        titulo: "Drácula",
        sinopsis: "Basada en un escalofriante capítulo de Drácula, la novela clásica de Bram Stoker. Drácula: Mar de sangre cuenta la aterradora historia del barco mercante Demeter, encargado de transportar una carga privada de 50...",
        img: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/64dd5226bc2b8800086fd82e/common/dracula-94430-1692882987118.jpg",
        año: 2023,
        genero: "terror",
        estreno: true
      },
      {
        titulo: "Mártires",
        sinopsis: "Verano de 1936, inicios de la Guerra Civil española. La película narra el martirio de 51 miembros de la Comunidad Claretiana de Barbastro (Huesca), deteniéndose en el aspecto humano y religioso de las personas que participaron ...",
        img: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/64dd5227bc2b8800086fd833/common/martires-94594-1692226234232.jpg",
        año: 2022,
        genero: "terror",
        estreno: false
      },
      {
        titulo: "Hablame",
        sinopsis: "Mia (Sophie Wilde) ha pasado años evitando el trauma de la muerte de su madre. Esto cambiará cuando sus amigos descubran cómo conjurar espíritus usando una mano embalsamada, lo que la llevará a  enfre...",
        img: "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/64d6379d9bfcc60008d1a284/common/hablame-94426-1692198740498.png",
        año: 2023,
        genero: "terror",
        estreno: false
      }

    ];

    // this.generatedMatrizPeliculas();

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      (params) => {

        this.paramGenero = params['genero'];
       
        if(this.paramGenero==="estreno"){
          this.data.getPeliculaEstreno().subscribe(dbPeliculas => {
            this.peliculas = dbPeliculas;
            this.generatedMatrizPeliculas(this.peliculas);
          });
  
        }else{
          this.data.getPeliculaPorGenero(this.paramGenero).subscribe(dbPeliculas => {
            this.peliculas = dbPeliculas;
            //this.selectCatalogoPorGenero();
            this.generatedMatrizPeliculas(this.peliculas);
          });
        }
        
      }
    );





  }

  selectCatalogoPorGenero() {

    //var catalogo: any[] = this.catalogoPeliculas;
    var catalogo: any[] = this.peliculas;
    this.tituloGenero = "Peliculas de " + this.paramGenero;
    var matriz: any[] = new Array(catalogo.length);
    var i = 0;
    for (let pelicula of catalogo) {
      pelicula.sinopsis = pelicula.sinopsis.substring(0,50);
      if (this.paramGenero === "estreno") {
        if (pelicula.estreno) {
          matriz[i] = pelicula;
          i++;
        }
      }
      else {
        if (pelicula.genero === this.paramGenero) {
          matriz[i] = pelicula;
          i++;

        }
      }
    }
    this.generatedMatrizPeliculas(matriz.slice(0, i));



  }

  generatedMatrizPeliculas(catalogo: any[]) {

    var filas = Math.ceil(catalogo.length / 4);
    var matriz: any[] = new Array(filas);
    for (var i = 0; i < filas; i++) {
      var inicio = i * 4;
      var fin = inicio + 3;
      if (fin > catalogo.length) {
        fin = catalogo.length;
      }
      matriz[i] = catalogo.slice(inicio, fin + 1);
    }

    this.viewCatalogo = matriz;

  }


}
