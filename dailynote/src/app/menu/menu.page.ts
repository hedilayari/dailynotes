import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public appPages = [
    { title: 'Accueil', url: '/menu/home', icon: 'home'},
    { title: 'Mes notes', url: '/menu/notes', icon: 'paper-plane'},
    { title: 'Méteo', url: '/menu/weather', icon: 'sunny' },
    { title: 'Mon profil', url: '/menu/profile', icon: 'person-circle' }
    ];

    userEmail: string= 'hedilayari6@gmail.com';
activePath: any;
    constructor(private router : Router) { }
    

  ngOnInit() {
  }

}
