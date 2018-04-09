import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';
import { Travel } from '../../model/travel';
import { Memo } from '../../model/memo';
import { EditMemoPage } from '../edit-memo/edit-memo';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-memo',
  templateUrl: 'memo.html',
})
export class MemoPage {

  travel = {} as Travel;
  memo = {} as Memo;
  memoList: Array<Memo>;
  res: any = {};

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public travelingService: TravelingServiceProvider) {
    this.travel = this.travelingService.getMyTravel();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemoPage');
    this.getActivityFromFirebase();
  }

  navigateToEditMemoPage(memo: Memo, editState: boolean) {
    this.travelingService.setMymemo(memo);
    this.navCtrl.push(EditMemoPage, {
      editState: editState
    });
  }

  getActivityFromFirebase() {
    this.afAuth.authState.subscribe(data => {
      this.res = this.afDatabase.list(`travel/${data.uid}/${this.travel.key}/memo`)
      this.res.valueChanges().subscribe(items => {
        if (items.length > 0) {
          this.memoList = items;
          this.sortByDateTime();
        } else {
        }
      })
    })
  }

  sortByDateTime() {
    if (this.memoList) {
      this.memoList.sort(function (a, b) {
        return (new Date(a.dateTime) > new Date(b.dateTime) ? 1 : -1);
      });
    }
  }

}
