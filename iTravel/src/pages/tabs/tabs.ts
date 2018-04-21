import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MemoPage } from '../memo/memo';
import { OpenWeatherPage } from '../open-weather/open-weather';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = MemoPage;
  tab3Root = OpenWeatherPage;

  constructor() { }

}
