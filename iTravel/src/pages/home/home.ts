import { Component } from '@angular/core';
import { IonicPage, NavController, DateTime, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { Travel } from '../../model/travel';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';
import { Activity } from '../../model/activity';
import { EditTravelPage } from '../edit-travel/edit-travel';
import { DatePipe } from '@angular/common';
import { TravelPage } from '../travel/travel';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  travel = {} as Travel;
  // uid: string = "";
  activityList: Array<Activity>;
  res: any = {};
  editState: boolean;
  dateList = [];

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public firebaseService: FirebaseSevice,
    public travelingService: TravelingServiceProvider,
    public datepipe: DatePipe,
    public appCtrl: App) {
    this.travel = this.travelingService.getMyTravel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    this.getActivityFromFirebase();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HomePage');
  }

  navigateToEditActivityPage(item: Activity, editState: boolean) {
    this.travelingService.setMyActivity(item);
    this.editState = editState;
    this.navCtrl.push(EditActivityPage, {
      editState: editState
    })
  }

  navigateToEditTravelPage(editState: boolean) {
    this.navCtrl.push(EditTravelPage, {
      editState: editState
    });
  }

  getActivityFromFirebase() {
    this.afAuth.authState.subscribe(data => {
      this.res = this.afDatabase.list(`travel/${data.uid}/${this.travel.key}/activity`)
      this.res.valueChanges().subscribe(items => {
        if (items.length > 0) {
          this.activityList = items;
          this.sortByDateTime();
        } else {
        }
      })
    })

  }
  sortByDateTime() {
    if (this.activityList) {
      this.activityList.sort(function (a, b) {
        return (new Date(a.startTime) > new Date(b.startTime) ? 1 : -1);
      });
      // adjust time
      this.activityList.forEach(value => {
        value.startTime = this.datepipe.transform(new Date(value.startTime), 'HH:mm');
        value.finishTime = this.datepipe.transform(new Date(value.finishTime), 'HH:mm');
      })
      this.createDateList()
    }
  }
  createDateList() {
    if (this.activityList) {
      this.dateList = [];
      for (var i = 0; i < this.activityList.length; i++) {
        if (this.dateList.indexOf(this.activityList[i].date)) {
          this.dateList.push(this.activityList[i].date)
        } else if (this.dateList.length == 0) {
          this.dateList.push(this.activityList[0].date)
        }
      }
    }
  }

  backToList() {
    this.appCtrl.getRootNavs()[0].setRoot(TravelPage);
  }

}
