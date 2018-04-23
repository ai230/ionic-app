import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { Weather } from '../../model/weather';

@IonicPage()
@Component({
  selector: 'page-open-weather',
  templateUrl: 'open-weather.html',
})
export class OpenWeatherPage {
  city: string;
  country: string;
  list = {} as any;
  weather: Weather;
  weatherList: Array<Weather>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public weatherProvider: WeatherServiceProvider) {
    this.city = 'Vancouver';
    this.country = 'ca';
    this.loadWeather(this.city, this.country);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenWeatherPage');
  }

  loadWeather(city: string, country: string) {
    this.city = city;
    this.country = country;
    this.weatherProvider.load(this.city, this.country)
      .then(data => {
        this.perseJson(data);
      })
  }

  perseJson(data: any) {
    this.list = data.list;
    console.log(this.list.length);
    this.weatherList = new Array<Weather>();
    for (var i = 0; i < this.list.length; i++) {
      this.weather = {} as Weather;
      this.weather.main = this.list[i].weather[0].main;
      this.weather.description = this.list[i].weather[0].description;
      this.weather.tempMin = this.getTemperature(this.list[i].main.temp_min);
      this.weather.tempMax = this.getTemperature(this.list[i].main.temp_max);
      this.weather.icon = './assets/imgs/weatherIcons/' + this.list[i].weather[0].icon + '.png';
      this.weather.date = this.list[i].dt_txt;
      if (this.weather.date.includes("15:00:00")) {
        this.weatherList.push(this.weather);
      }
    }
  }

  getTemperature(f: number) {
    //T(°C) = T(K) - 273.15
    return (f - 273.15).toFixed(1);
  }

}
