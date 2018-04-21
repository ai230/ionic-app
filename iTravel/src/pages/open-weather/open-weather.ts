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
  data: any;
  list: any;
  weather: Weather;
  weatherList: Array<Weather>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public weatherProvider: WeatherServiceProvider) {
    this.loadWeather();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenWeatherPage');

  }

  loadWeather() {
    this.weatherProvider.load()
      .then(data => {
        this.data = data;
        this.list = data.list;
        this.perseJson();
      })
  }

  perseJson() {
    console.log(this.list.length);
    this.weatherList = new Array<Weather>();
    for (var i = 0; i < this.list.length; i++) {
      this.weather = {} as Weather;
      this.weather.main = this.list[0].weather[0].main;
      this.weather.description = this.list[0].weather[0].description;
      this.weather.tempMin = this.getTemperature(this.list[0].main.temp_min);
      this.weather.tempMax = this.getTemperature(this.list[0].main.temp_max);
      this.weather.icon = '//openweathermap.org/img/w/' + this.list[0].weather[0].icon + '.png';
      this.weather.date = this.list[i].dt_txt;
      console.log(this.weather);
      if (this.weather.date.includes("00:00:00")) {
        this.weatherList.push(this.weather);
      }
    }
  }

  getTemperature(f: number) {
    //T(°C) = T(K) - 273.15
    return Math.round(f - 273.15);
  }
}
