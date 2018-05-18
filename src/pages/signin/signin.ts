import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomPage } from  '../room/room';
import { AngularFireAuth } from 'angularfire2/auth';
import { ContactPage } from '../contact/contact';
import { Contact } from '../../models/Contact';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  userInformation = {} as Contact;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthenticationProvider) {}

  ionViewDidLoad() {}
  signIn() {
    this.authProvider.login(this.userInformation).
    then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot('ContactPage');
      else
        alert(res);
    })
  }

  goSignUp()
  {
    this.navCtrl.setRoot('SignupPage');
  }
}
