import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Profile } from '../../model/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePipe } from '@angular/common';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  profileData: AngularFireObject<Profile>
  profile = {} as Profile
  item: any = {};
  uid;
  loader;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private alertCtrl: AlertController,
    private datePipe: DatePipe,
    private spinnerDialog: SpinnerDialog,
    private loading: LoadingController) {

  }

  presentLoading() {
    this.loader = this.loading.create({
      spinner: 'bubbles',
      content: "Please wait..."
    });
    this.loader.present();
  }

  ionViewDidLoad() {
    // this.presentLoading();
    this.spinnerDialog.show();
    console.log('ionViewDidLoad SchedulePage');
    this.getProfileData();
  }

  getProfileData() {
    this.afAuth.authState.subscribe(data => {
      this.uid = data.uid;
      this.item = this.afDatabase.object(`profile/${data.uid}`)
      this.item.valueChanges().subscribe(item => {
        this.profileData = item;
        console.log(this.profileData);
      })
    });
  }

  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }
      this.updatePhoto(options);
    }
    catch (e) {
      console.log(e);
    }
  }

  async selectPhoto() {
    try {
      const options: CameraOptions = {
        quality: 60,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      this.updatePhoto(options);

    } catch (e) {
      console.log(e);
    }
  }

  async updatePhoto(options: CameraOptions) {
    this.spinnerDialog.show();
    const result = await this.camera.getPicture(options);
    const image = `data:image/jpeg;base64,${result}`;
    const pictures = storage().ref(`pictures/${this.uid}/profilePhoto`);
    const updatePhoto = pictures.putString(image, 'data_url');
    const updatePhotoUrl = this.editProfile();
    this.profile.photoUrl = image;
    this.spinnerDialog.hide();
  }

  editProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`)
        .update(this.profile);
    })
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Select Photo',
          handler: () => {
            this.selectPhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.selectPhoto();
          }
        }
      ]
    });
    alert.present();
  }
}
