import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController, AlertController } from 'ionic-angular';
import { Activity } from '../../model/activity';
import { Travel } from '../../model/travel';
import { TravelPage } from '../travel/travel';
import { FirebaseSevice } from '../../providers/traveling-service/firebase.service';
import { storage } from 'firebase';
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraService } from '../../providers/camera.service';
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
  travelData: Array<Travel>;
  uid;
  urlRef;

  private base64Image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    public firebaseService: FirebaseSevice,
    public travelService: TravelingServiceProvider,
    private camera: Camera,
    private cameraService: CameraService,
    private alertCtrl: AlertController) {

    this.editState = this.navParams.get('editState');
    this.uid = this.navParams.get('uid');

    if (this.editState) {
      this.travel = this.travelService.getMyTravel();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTravelPage');
  }

  addTravel() {
    if (this.editState) {
      this.editTravel(this.travel);
    } else {
      console.log(this.travel.title);
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
    }, (err) => {
      console.log(err);
    });
  }

  showConfirm() {
    let alert = this.alertCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Select Photo',
          handler: () => {
            this.selectPicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }
}
