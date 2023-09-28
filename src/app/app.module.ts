import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { SectionComponent } from './section/section.component';
import { FooterComponent } from './footer/footer.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RegistroComponent } from './fomularios/registro/registro.component';
import { CarouselComponent } from './carousel/carousel.component';
import { Carousel2Component } from './carousel2/carousel2.component';
import { ViewCarouselComponent } from './view-carousel/view-carousel.component';
import { GeneroComponent } from './section/genero/genero.component';
import { ListaComponent } from './section/lista/lista.component';
import { AngularFireModule} from '@angular/fire/compat';
import { LoginComponent } from './formularios/login/login.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    SectionComponent,
    FooterComponent,
    RegistroComponent,
    CarouselComponent,
    Carousel2Component,
    ViewCarouselComponent,
    GeneroComponent,
    ListaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
