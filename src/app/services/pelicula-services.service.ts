import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Pelicula } from '../interface/pelicula';
import { addDoc, collection, deleteDoc, doc, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaServicesService {
  collectionName: string = "Catalogo";

  constructor(private firestore: Firestore) { }


  addPelicula(pelicula:Pelicula){
    console.log('Estoy en addProgramador....');
    console.log('Recibo los datos....');
    console.log(pelicula);
    console.log('-----------------------------');
    const db = collection(this.firestore, this.collectionName);
    return addDoc(db,pelicula);
  }

  getPeliculas(): Observable<Pelicula[]>{  
    const db = collection(this.firestore,this.collectionName);
    return collectionData(db, {idField:'id'}) as Observable<Pelicula[]>;
  }

  deleteProgramador(pelicula:Pelicula){
    const db = doc(this.firestore,this.collectionName+'/'+pelicula.id);
    deleteDoc(db);
  }

  getPeliculaPorGenero(genero: string): Observable<Pelicula[]>{  
    const programadorRef = collection(this.firestore,this.collectionName);
    return   collectionData(query(programadorRef, where("genero", "==", genero))) as Observable<Pelicula[]>;
    
  }

  getPeliculaEstreno(): Observable<Pelicula[]>{  
    const programadorRef = collection(this.firestore,this.collectionName);
    return   collectionData(query(programadorRef, where("estreno", "==", true))) as Observable<Pelicula[]>;
    
  }

}
