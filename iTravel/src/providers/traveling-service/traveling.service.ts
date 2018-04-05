import { Injectable } from '@angular/core';
import { Travel } from '../../model/travel';
import { Activity } from '../../model/activity';


@Injectable()
export class TravelingServiceProvider {

  myTravel = {} as Travel
  myActivity = {} as Activity
  myUid: string;

  constructor() {
    console.log('Hello TravelingServiceProvider Provider');
  }

  setMyTravel(travel: Travel) {
    console.log('my travel is ' + travel.title);
    this.myTravel = travel;
  }

  getMyTravel() {
    console.log('get my travel is ' + this.myTravel.title);
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
    console.log('my uid is ' + this.myUid);
    return this.myUid;
  }
}
