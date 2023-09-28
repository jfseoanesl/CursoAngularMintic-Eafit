import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(private router: Router, private ngZone: NgZone, private firebaseAuthenticationServices: AngularFireAuth) {
    this.firebaseAuthenticationServices.authState.subscribe(
      (user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
        }
        else {
          localStorage.setItem('user', 'null');

        }
      }

    );

  }

  get isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  //ingreso con email y password
  logInAWithEmailAndPassword(email: string, password: string){
    return this.firebaseAuthenticationServices.signInWithEmailAndPassword(email, password)
    .then(
      (userCredential)=>{
        this.userData = userCredential.user;
        this.observerUserState();
      }
    )
    .catch(
      (error:Error)=>{alert(error.message);}
    );
  }

  //ingreso con el boton de google

  logInWithGoogleProvider(){

    return this.firebaseAuthenticationServices.signInWithPopup(new GoogleAuthProvider())
           .then(
             ()=>this.observerUserState()
           )
           .catch(
             (error:Error)=>{alert(error.message);}
           )
 }

  observerUserState(){
    this.firebaseAuthenticationServices.authState.subscribe(
      (userState)=>{
        userState && this.ngZone.run(()=> this.router.navigate(['lista']));
      }
    );
  }

  logOut(){

    return this.firebaseAuthenticationServices.signOut()
      .then(
        ()=>{
          localStorage.removeItem('user');
          this.router.navigate(['']);
        }
      );

  }

}
