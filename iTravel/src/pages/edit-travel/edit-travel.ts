import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, AlertController } from 'ionic-angular';
// import { Activity } from '../../model/activity';
import { Travel } from '../../model/travel';
import { TravelPage } from '../travel/travel';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
// import { storage } from 'firebase';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TravelingServiceProvider } from '../../providers/traveling-service/traveling.service';

@IonicPage()
@Component({
  selector: 'page-edit-travel',
  templateUrl: 'edit-travel.html',
})
export class EditTravelPage {
  travel = {} as Travel;
  index: string;
  editState: boolean = false;
  uid;

  private base64Image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseSevice,
    public travelService: TravelingServiceProvider,
    private camera: Camera,
    private alertCtrl: AlertController) {

    this.editState = this.navParams.get('editState');
    this.uid = this.navParams.get('uid');

    if (this.editState) {
      this.travel = this.travelService.getMyTravel();
    } else {
      this.travel.base64Image = "./assets/imgs/sampleBG.jpg";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTravelPage');
  }

  addTravel() {
    if (this.editState) {
      this.editTravel(this.travel);
    } else {
      this.firebaseService.addTravel(this.travel).then(ref => {
        this.travel.key = ref.key;
        this.travel.base64Image = this.base64Image;
        this.editTravel(this.travel);
      });
    }
  }

  editTravel(item: Travel) {
    this.firebaseService.editTravel(item, this.uid).then(ref => {
      this.navCtrl.setRoot(TravelPage);
    })
  }

  takePicture() {
    this.camera.getPicture({
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.travel.base64Image = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  selectPicture() {
    this.camera.getPicture({
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.travel.base64Image = this.base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  deleteTravel() {
    this.firebaseService.deleteTravel(this.uid, this.travel.key).then(ref => {
      this.navCtrl.setRoot(TravelPage);
    })
  }

  showConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Picture',
      message: 'Do you want to take a picture or choose a photo?',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.selectPicture();
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    alert.present();
  }

  deleteConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete this plan? Also all of your schedule for this plan will be deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTravel();
          }
        }
      ]
    });
    alert.present();
  }
}
