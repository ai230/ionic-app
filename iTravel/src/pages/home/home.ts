import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Profile } from '../../model/profile';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
import { Travel } from '../../model/travel';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';
import { Activity } from '../../model/activity';
import { EditTravelPage } from '../edit-travel/edit-travel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  travel = {} as Travel;
  activity = {} as Activity;
  item: any = {};
  uid: string = "";
  activityList: Array<Activity>;
  res: any = {};
  editState: boolean;
  dateList = [];
  dateArrayList = [];

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public firebaseService: FirebaseSevice,
    public travelingService: TravelingServiceProvider) {
    this.travel = this.travelingService.getMyTravel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getActivityFromFirebase();
  }

  openEditSchedule(item: Activity, editState: boolean) {
    this.travelingService.setMyActivity(item);
    this.editState = editState;
    this.navCtrl.push(EditActivityPage, {
      editState: editState
    })
  }

  openSetting(editState: boolean) {
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
        value.startTime = value.startTime.substring(value.date.length + 1, value.startTime.length);
        value.finishTime = value.finishTime.substring(value.date.length + 1, value.finishTime.length);
      })
      this.createDateList()
    }
  }
  createDateList() {
    if (this.activityList) {
      for (var i = 0; i < this.activityList.length; i++) {
        if (this.dateList.indexOf(this.activityList[i].date)) {
          this.dateList.push(this.activityList[i].date)
        } else if (this.dateList.length == 0) {
          this.dateList.push(this.activityList[0].date)
        }
      }
    }
  }
}
