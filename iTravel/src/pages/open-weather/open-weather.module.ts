import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenWeatherPage } from './open-weather';

@NgModule({
  declarations: [
    OpenWeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenWeatherPage),
  ],
})
export class OpenWeatherPageModule {}
