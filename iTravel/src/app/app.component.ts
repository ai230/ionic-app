import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage'

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { TravelPage } from '../pages/travel/travel';
import { EditTravelPage } from '../pages/edit-travel/edit-travel';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  email: string;
  uid: string;
  rootPage: any = LoginPage;

  constructor(
    private storage: Storage,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
