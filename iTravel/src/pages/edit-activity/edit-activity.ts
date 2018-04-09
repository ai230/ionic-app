import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Activity } from '../../model/activity';
import { Travel } from '../../model/travel';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
})
export class EditActivityPage {

  icons: any[] = [
    { "isActive": true, "iconUrl": "./assets/imgs/my-icon/none.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/plane.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/train.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/bus.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/car.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/boat.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/bike.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/walk.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/hotel.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/eat.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/beer.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/happy.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/cafe.png" },
    { "isActive": false, "iconUrl": "./assets/imgs/my-icon/shopping.png" }
  ];

  travel = {} as Travel
  activity = {} as Activity
  editState: boolean;
  selectedIconUrl: string;
  myUid;
  date = new Date();
  myStartTime;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseSevice,
    public travelingService: TravelingServiceProvider,
    public datepipe: DatePipe,
    private alertCtrl: AlertController) {
    this.editState = this.navParams.get('editState');
    this.travel = this.travelingService.getMyTravel();
    this.myUid = this.travelingService.getMyUid();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSchedulePage');
    if (this.editState) {
      this.activity = this.travelingService.getMyActivity();
      this.selectIcon(this.activity.iconUrl);
    } else {
      this.selectedIconUrl = "./assets/imgs/my-icon/none.png";
      this.activity.iconUrl = this.selectedIconUrl;
      this.activity.title = "";
      this.activity.startTime = "";
      this.activity.finishTime = "";
      this.activity.date = moment().format("YYYY-MM-DD");
      this.activity.memo = "";
    }
  }

  addActivity() {
    // edit activity
    this.activity.iconUrl = this.selectedIconUrl;
    if (this.editState) {
      this.activity.startTime = this.activity.date + " " + this.activity.startTime;
      this.activity.finishTime = this.activity.date + " " + this.activity.finishTime;
      this.editActivity(this.activity);
      let selectIcon = { "isActive": true, "iconUrl": this.activity.iconUrl };
    } else { // add new activity
      this.firebaseService.addActivity(this.travel.key, this.activity).then(ref => {
        // update key in activity
        this.activity.key = ref.key;
        this.activity.startTime = this.activity.date + " " + this.activity.startTime;
        this.activity.finishTime = this.activity.date + " " + this.activity.finishTime;
        this.editActivity(this.activity);
      })
    }
  }

  editActivity(activity: Activity) {
    this.firebaseService.editActivity(activity).then(ref => {
      this.navCtrl.pop();
    })
  }

  deleteActivity() {
    this.firebaseService.deleteActivity(this.myUid, this.travel.key, this.activity.key).then(ref => {
      this.navCtrl.pop();
    })
  }

  selectIcon(name: string) {
    for (var i = 0; i < this.icons.length; i++) {
      this.icons[i].isActive = false
      if (this.icons[i].iconUrl == name) {
        this.icons[i].isActive = true
        this.selectedIconUrl = this.icons[i].iconUrl;
      }
    }
  }

  deleteConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete this schedule?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteActivity();
          }
        }
      ]
    });
    alert.present();
  }
}