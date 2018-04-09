import { Injectable } from '@angular/core';
import { Travel } from '../../model/travel';
import { Activity } from '../../model/activity';
import { Memo } from '../../model/memo';


@Injectable()
export class TravelingServiceProvider {

  myTravel = {} as Travel
  myActivity = {} as Activity
  myMemo = {} as Memo

  myUid: string;

  constructor() {
    console.log('Hello TravelingServiceProvider Provider');
  }

  setMyTravel(travel: Travel) {
    this.myTravel = travel;
  }

  getMyTravel() {
    return this.myTravel;
  }

  setMyActivity(activity: Activity) {
    this.myActivity = activity;
  }

  getMyActivity() {
    return this.myActivity;
  }

  setMyUid(uid: string) {
    this.myUid = uid;
  }

  getMyUid() {
    return this.myUid;
  }

  setMymemo(memo: Memo) {
    this.myMemo = memo;
  }

  getMyMemo() {
    return this.myMemo;
  }

}
