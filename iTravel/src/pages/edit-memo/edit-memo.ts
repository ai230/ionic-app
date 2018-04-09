import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, DateTime } from 'ionic-angular';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';
import { Memo } from '../../model/memo';
import { Travel } from '../../model/travel';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
import { TabsPage } from '../tabs/tabs';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-edit-memo',
  templateUrl: 'edit-memo.html',
})
export class EditMemoPage {

  travel = {} as Travel;
  memo = {} as Memo;
  selectedIcon;
  editState: boolean;
  myUid;
  date = new Date();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public firebaseService: FirebaseSevice,
    public travelingService: TravelingServiceProvider,
    private datePipe: DatePipe) {

    this.editState = this.navParams.get('editState');
    this.travel = this.travelingService.getMyTravel();
    this.myUid = this.travelingService.getMyUid();
    if (this.editState) {
      this.memo = this.travelingService.getMyMemo();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMemoPage');
    this.memo.dateTime = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }
  addMemo() {
    // edit memo
    if (this.editState) {
      this.editMemo(this.memo);
    } else { // add new memo
      this.firebaseService.addMemo(this.travel.key, this.memo).then(ref => {
        // update key in memo
        this.memo.key = ref.key;
        this.editMemo(this.memo);
      })
    }
  }

  editMemo(memo: Memo) {
    this.firebaseService.editMemo(memo).then(ref => {
      this.navCtrl.pop();
    })
  }

  deleteMemo() {
    this.firebaseService.deleteMemo(this.myUid, this.travel.key, this.memo.key).then(ref => {
      this.navCtrl.pop();
    })
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
            this.deleteMemo();
          }
        }
      ]
    });
    alert.present();
  }

}
