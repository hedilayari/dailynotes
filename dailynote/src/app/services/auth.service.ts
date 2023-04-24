import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  userData!: User;
constructor(private afAuth: AngularFireAuth,private router : Router,) {
//Sauvegarder les données utilisateur dans le localstorage lorsqu'il est connecté et null lors de la déconnexion
this.afAuth.authState.subscribe(user => {
  if (user) {
    this.userData != user;
    localStorage.setItem('user', JSON.stringify(this.userData));
  } else {
    localStorage.removeItem('user');
  }
})
}
//Création d'un nouveau compte
signUpWithEmail(value: { email: string; password: string; }) {
  return new Promise<any>((resolve, reject) => {
  this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
  .then( (res) =>{ resolve(res)})
  .catch( (err) => { if (err.code=="auth/email-already-in-use") err="L'adresse email est déjà utilisée par un autre compte.";
  else if (err.code=="auth/network-request-failed") err="Veuillez vérifier votre connexion internet.";
  reject(err)}
  )
  })
  }
  signInWithEmail(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
    this.afAuth.signInWithEmailAndPassword(value.email, value.password)
    .then(
    (res) => {
    this.SetUserData(res.user);
    resolve(res);
    },)
    .catch( (err) => {
    if (err.code=="auth/user-not-found") err="Il n'y a pas d'utilisateur correspondant à ces identifiants.";
    else if (err.code=="auth/network-request-failed") err="Veuillez vérifier votre connexion internet.";
    reject(err)}
    )
    })
    }
    SetUserData(user:any) {
    this.userData =  user
    localStorage.setItem('user', JSON.stringify(this.userData));
  }
  // Renvoie les informations de l'utilisateur connecté
userDetails() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
  // Renvoie vrai lorsque l'utilisateur est connecté
  get isLoggedIn(): boolean {
    const userStr = localStorage.getItem('user');
    if (userStr === null) {
      return false;
    }
  
    try {
      const user = JSON.parse(userStr);
      return user !== null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return false;
    }
  }
  
}
