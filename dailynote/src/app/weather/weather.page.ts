import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  city!: string 
  dataWeather: any;
  errorMessage: string = "";
  constructor(private weatherService: WeatherService,private toastController: ToastController) { }
  ngOnInit() { }
  //Récupter la météo actuelle d’une ville
  onLoadWeather() {this.weatherService.getWeatherData(this.city).subscribe(
  result => { this.dataWeather = result },
  error => { this.presentToast() });
  }
  //Afficher un toast si ville non trouvée
  async presentToast() {
  const toast = await this.toastController.create({
  message: 'Ville non trouvée',
  duration: 2000
  });toast.present();
  }

}
