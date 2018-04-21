import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EditActivityPage } from '../pages/edit-activity/edit-activity';
import { LoginPage } from '../pages/login/login';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { TravelPage } from '../pages/travel/travel';
import { EditTravelPage } from '../pages/edit-travel/edit-travel';
import { IonicStorageModule } from '@ionic/storage';
import { FirebaseSevice } from '../providers/traveling-service/firebase.service';
import { TravelingServiceProvider } from '../providers/traveling-service/traveling.service';
import { Camera } from '@ionic-native/camera';
import { UserServiceProvider } from '../providers/user.service';
import { DatePipe } from '@angular/common';
import { MemoPage } from '../pages/memo/memo';
import { EditMemoPage } from '../pages/edit-memo/edit-memo';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';// angular5 
import { OpenWeatherPage } from '../pages/open-weather/open-weather';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfilePage,
    TravelPage,
    EditTravelPage,
    HomePage,
    EditActivityPage,
    AboutPage,
    MemoPage,
    EditMemoPage,
    OpenWeatherPage,
    TabsPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfilePage,
    TravelPage,
    EditTravelPage,
    HomePage,
    EditActivityPage,
    AboutPage,
    MemoPage,
    EditMemoPage,
    OpenWeatherPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseSevice,
    TravelingServiceProvider,
    UserServiceProvider,
    Camera,
    DatePipe,
    SpinnerDialog,
    WeatherServiceProvider
  ]
})
export class AppModule { }
