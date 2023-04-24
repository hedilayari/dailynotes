import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }
//https://openweathermap.org/api
getWeatherData(city: string) {
return this.httpClient.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7987c0239da0eeedc66e77402ddbbed3&units=metric")
}
}
