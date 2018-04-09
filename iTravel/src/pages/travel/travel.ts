import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
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
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { LoginPage } from '../login/login';

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
    private alertCtrl: AlertController,
    public travelingService: TravelingServiceProvider,
    public firebaseService: FirebaseSevice,
    private spinnerDialog: SpinnerDialog,
    public menu: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelPage');
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    this.spinnerDialog.show();
    this.afAuth.authState.subscribe(data => {
      this.uid = data.uid;
      this.res = this.afDatabase.list(`travel/${data.uid}`)
      this.res.valueChanges().subscribe(items => {
        this.spinnerDialog.hide();
        if (items.length > 0) {
          this.travelList = items;
          this.hasData = true;
          this.sortByDateTime();
        } else {
          this.hasData = false;
          this.presentConfirm();
        }
      })
    })
  }

  sortByDateTime() {
    if (this.travelList) {
      this.travelList.sort(function (a, b) {
        return (new Date(a.startDate) > new Date(b.startDate) ? 1 : -1);
      })
    }
  }

  openEditTravel() {
    this.navCtrl.push(EditTravelPage, { uid: this.uid });
  }

  navigateToTabPage(item: Travel) {
    this.firebaseService.getActivityAuth(item.key);
    this.firebaseService.getMemoAuth(item.key);
    this.travelingService.setMyTravel(item);
    this.travelingService.setMyUid(this.uid);
    this.navCtrl.push(TabsPage);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Create your first plan?',
      message: 'Do you want to continue creating your first plan?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Create',
          handler: () => {
            this.openEditTravel();
          }
        }
      ]
    });
    alert.present();
  }

}
