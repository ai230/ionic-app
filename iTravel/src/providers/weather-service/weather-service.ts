import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../../model/weather';

@Injectable()
export class WeatherServiceProvider {
  apiKey = '67fd385d18d9a2e80403b1e6ed1c976e';
  url;
  data: any;
  constructor(public http: HttpClient) {
    this.url = 'http://api.openweathermap.org/data/2.5/forecast?q=Vancouver,ca&APPID=' + this.apiKey;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      //http.get will return Observable<HttpResponse<string>>
      //.map(res => res.jspn()) no longer need to call this function
      this.http.get(this.url)
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
