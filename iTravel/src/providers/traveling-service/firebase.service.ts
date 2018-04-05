import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, snapshotChanges } from 'angularfire2/database';
import { Travel } from '../../model/travel';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../../model/activity';
import { TravelingServiceProvider } from './traveling.service';
import { storage } from 'firebase';

@Injectable()
export class FirebaseSevice {

    private travelingListRef;
    private activityListRef;
    travelingList$: Observable<Travel[]>
    travelData: AngularFireObject<Travel[]>
    private res: any;
    private hasData;
    constructor(
        private afDatabase: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        public travelongService: TravelingServiceProvider) {
        this.getAuth();
    }

    /**
     * Adding & Editing Travel 
     */

    getAuth() {
        this.afAuth.authState.subscribe(data => {
            return this.travelingListRef = this.afDatabase.list(`travel/${data.uid}`)
        })
    }

    addTravel(item: Travel) {
        return this.travelingListRef.push(item);
    }

    async editTravel(item: Travel, uid: string) {
        return this.travelingListRef.update(item.key, item)
    }


    async createPhotoUrl(key: string, uid: string) {
        var updateUrl;
        try {
            const pathRef = await storage().ref(`travel/${uid}/${key}`)
                .getDownloadURL().then(function (url) {
                    updateUrl = url
                }).catch(function (error) {
                    console.log(error)
                });
        } catch (error) { console.log(error) }
        return updateUrl;
    }

    /**
     * Adding & Editing Activity 
     */

    getActivityAuth(itemKey: String) {
        this.afAuth.authState.subscribe(data => {
            this.activityListRef = this.afDatabase.list(`travel/${data.uid}/${itemKey}/activity`)
        })
    }

    addActivity(itemKey: String, activity: Activity) {
        return this.activityListRef.push(activity);
    }

    editActivity(activity: Activity) {
        return this.activityListRef.update(activity.key, activity);
    }

    /**
     * remove Activity 
     */

    deleteActivity(uid: string, travelKey: string, activityKey: string) {
        return this.afDatabase.list(`travel/${uid}/${travelKey}/activity/${activityKey}`).remove();
    }
    // async sample1() {
    //     return "sample1";
    // }
}