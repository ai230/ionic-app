import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Activity } from '../../model/activity';
import { TabsPage } from '../tabs/tabs';
import { Travel } from '../../model/travel';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
import { storage, initializeApp } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
})
export class EditActivityPage {

  icons: any[] = [
    { "isActive": true, "icon": "ios-help-circle-outline", "iconActive": "ios-help-circle", "iconName": "None" },
    { "isActive": false, "icon": "ios-plane-outline", "iconActive": "ios-plane", "iconName": "Plane" },
    { "isActive": false, "icon": "ios-train-outline", "iconActive": "ios-train", 'iconName': "Train" },
    { "isActive": false, "icon": "ios-bus-outline", "iconActive": "ios-bus", 'iconName': "Bus" },
    { "isActive": false, "icon": "ios-car-outline", "iconActive": "ios-car", 'iconName': "Car" },
    { "isActive": false, "icon": "ios-bicycle-outline", "iconActive": "ios-bicycle", 'iconName': "Bike" },
    { "isActive": false, "icon": "ios-boat-outline", "iconActive": "ios-boat", 'iconName': "Boat" },
    { "isActive": false, "icon": "ios-heart-outline", "iconActive": "ios-heart", 'iconName': "Date" },
    { "isActive": false, "icon": "ios-american-football-outline", "iconActive": "ios-american-football", 'iconName': "Sport" },
    { "isActive": false, "icon": "ios-beer-outline", "iconActive": "ios-beer", 'iconName': "Drink" },
    { "isActive": false, "icon": "ios-cart-outline", "iconActive": "ios-cart", 'iconName': "Shopping" }
  ];

  travel = {} as Travel
  activity = {} as Activity
  editState: boolean;
  selectedIcon: string;
  myUid;
  date = new Date();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseSevice,
    public travelingService: TravelingServiceProvider,
    private camera: Camera,
    public datepipe: DatePipe) {
    this.editState = this.navParams.get('editState');
    this.travel = this.travelingService.getMyTravel();
    this.myUid = this.travelingService.getMyUid();
    if (this.editState) {
      this.activity = this.travelingService.getMyActivity();
      this.selectIcon(this.activity.iconName);
    } else {
      this.selectedIcon = "ios-help-circle-outline";
      this.activity.iconName = this.selectedIcon;
      this.activity.title = "";
      this.activity.startTime = "";
      this.activity.finishTime = "";
      this.activity.date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
      this.activity.memo = "";
    }
  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSchedulePage');
  }

  addActivity() {
    // edit activity
    this.activity.iconName = this.selectedIcon;
    if (this.editState) {
      this.activity.startTime = this.activity.date + " " + this.activity.startTime;
      this.activity.finishTime = this.activity.date + " " + this.activity.finishTime;
      this.editActivity(this.activity);
    } else { // add new activity
      this.firebaseService.addActivity(this.travel.key, this.activity).then(ref => {
        // update key in activity
        this.activity.key = ref.key;
        this.activity.startTime = this.activity.date + " " + this.activity.startTime;
        this.activity.finishTime = this.activity.date + " " + this.activity.finishTime;
        console.log(this.activity.startTime);
        console.log(this.activity.finishTime);
        this.editActivity(this.activity);
      })
    }
  }

  editActivity(activity: Activity) {
    this.firebaseService.editActivity(activity).then(ref => {
      this.navCtrl.setRoot(TabsPage);
    })
  }

  deleteActivity() {
    this.firebaseService.deleteActivity(this.myUid, this.travel.key, this.activity.key).then(ref => {
      this.navCtrl.setRoot(TabsPage);
    })
  }

  selectIcon(name: string) {
    for (var i = 0; i < this.icons.length; i++) {
      this.icons[i].isActive = false
      if (this.icons[i].icon == name) {
        this.icons[i].isActive = true
        this.selectedIcon = this.icons[i].icon;
      }
    }
  }


}