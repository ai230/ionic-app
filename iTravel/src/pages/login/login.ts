import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../model/user';
import { Storage } from '@ionic/storage'
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth'
import { ProfilePage } from '../profile/profile';
import { TravelPage } from '../travel/travel';
import { UserServiceProvider } from '../../providers/user.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  foundUser: boolean;

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.getUserFromStoreage();
  }

  getUserFromStoreage() {
    this.storage.get('loginData1').then((val) => {
      if (val != null) {
        let loginData = JSON.parse(val);
        this.user.email = loginData.email;
        this.foundUser = true;
      }
    });
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      if (result) {
        this.afAuth.authState.subscribe(data => {
          let loginData = {
            email: data.email,
            uid: data.uid
          }
          // this.user
          console.log(loginData);
          this.storage.set('loginData1', JSON.stringify(loginData));
        })
        this.navCtrl.setRoot(TravelPage);
      }
    }
    catch (e) {
      console.log(e);
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
  register() {
    this.navCtrl.push(RegisterPage);
  }

}
