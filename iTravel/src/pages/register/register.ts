import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth'
import { ProfilePage } from '../profile/profile';
import { TravelPage } from '../travel/travel';
import { Storage } from '@ionic/storage'
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(
    public storage: Storage,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      if (result) {
        this.navCtrl.push(TravelPage);
      }
    }
    catch (e) {
      console.log(e);
      let msg = this.checkError(e.code);
      this.showAlert("Error", msg);
    }
  }

  checkError(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "The email address is already in use by another account.";
      case "auth/argument-error":
        return "password must be a valid string.";
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      default:
        return "Please check your email and password";
    }
  }

  showAlert(myTitle: string, msg: string) {
    let alert = this.alertCtrl.create({
      title: myTitle,
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
