import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraService {

    constructor(
        private afAuth: AngularFireAuth,
        private afDatabase: AngularFireDatabase,
        private camera: Camera,
        private alertCtrl: AlertController) {
    }

    async takePhoto(uid: string, urlRef: string) {
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
            this.updatePhoto(options, uid, urlRef);
        }
        catch (e) {
            console.log(e);
        }
    }

    async selectPhoto(uid: string, urlRef: string) {
        try {
            const options: CameraOptions = {
                quality: 100,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                correctOrientation: true
            }
            this.updatePhoto(options, uid, urlRef);
        } catch (e) {
            console.log(e);
        }
    }

    async updatePhoto(options: CameraOptions, uid: string, urlRef: string) {
        const result = await this.camera.getPicture(options);
        const image = `data:image/jpeg;base64,${result}`;
        const pictures = storage().ref(urlRef);
        const updatePhoto = pictures.putString(image, 'data_url');
        // const updatePhotoUrl = this.editProfile();
    }

    // async createPhotoUrl(uid:string) {
    //     var updateUrl;
    //     try {
    //         const pathRef = await storage().ref(`pictures/${uid}/profilePhoto`)
    //             .getDownloadURL().then(function (url) {
    //                 updateUrl = url
    //             }).catch(function (error) {
    //                 console.log(error)
    //             });
    //     } catch (error) { console.log(error) }
    //     return updateUrl;
    // }

    // editProfile() {
    //     this.afAuth.authState.take(1).subscribe(auth => {
    //         this.afDatabase.object(`profile/${auth.uid}`)
    //             .update(this.profile);
    //     })
    // }

    presentConfirm(uid: string, urlRef: string) {
        let alert = this.alertCtrl.create({
            // title: 'Confirm purchase',
            // message: 'Do you want to buy this book?',
            buttons: [
                {
                    text: 'Take Photo',
                    handler: () => {
                        this.takePhoto(uid, urlRef);
                    }
                },
                {
                    text: 'Select Photo',
                    handler: () => {
                        this.selectPhoto(uid, urlRef);
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