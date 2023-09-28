import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCarouselComponent } from './view-carousel/view-carousel.component';
import { GeneroComponent } from './section/genero/genero.component';
import { ListaComponent } from './section/lista/lista.component';
import { RegistroComponent } from './fomularios/registro/registro.component';
import { authGuard } from './guardas/auth.guard';
import { LoginComponent } from './formularios/login/login.component'





const routes: Routes = [
  {path:'', component:ViewCarouselComponent},
  {path:'estreno',component:GeneroComponent},
  {path:'accion', component:GeneroComponent},
  {path:'directiva_if', component:GeneroComponent},
  {path: 'infantil', component:GeneroComponent},
  {path: 'genero', component:GeneroComponent},
  {path: 'lista', component:ListaComponent, canActivate:[authGuard]},
  {path: 'registro', component:RegistroComponent,canActivate:[authGuard]},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
