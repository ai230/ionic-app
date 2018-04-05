import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Activity } from '../../model/activity';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';
import { Travel } from '../../model/travel';
import { EditTravelPage } from '../edit-travel/edit-travel';
import { Observable } from 'rxjs/Observable';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
import { storage } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-travel',
  templateUrl: 'travel.html'
})
export class TravelPage {
  travelList: Array<Travel>;
  res: any = {};
  hasData: boolean;
  uid;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    public travelingService: TravelingServiceProvider,
    public firebaseService: FirebaseSevice) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelPage');
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    this.afAuth.authState.subscribe(data => {
      this.uid = data.uid;
      this.res = this.afDatabase.list(`travel/${data.uid}`)
      this.res.valueChanges().subscribe(items => {
        if (items.length > 0) {
          this.travelList = items;
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      })
    })
  }

  openEditTravel() {
    this.navCtrl.push(EditTravelPage, { uid: this.uid });
  }

  navigateToTabPage(item: Travel) {
    this.firebaseService.getActivityAuth(item.key);
    this.travelingService.setMyTravel(item);
    this.travelingService.setMyUid(this.uid);
    this.navCtrl.push(TabsPage);
  }

  showActionSheetCtrl(travel: Travel) {
    this.actionSheetCtrl.create({
      title: `${travel.title}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            //do something
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.res.remove(travel.key)
            //do something
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            //do something
          }
        }
      ]
    }).present();
  }
}
