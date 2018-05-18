import { UserserviceProvider } from './../../providers/userservice/userservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from '../signin/signin';
import * as firebase from 'firebase';
import { Contact } from '../../models/Contact';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  contactsRef = firebase.database().ref('contacts/');

  data = { 
    displayName: '',
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private afAuth: AngularFireAuth, public userservice:UserserviceProvider) {
  }

  ionViewDidLoad() {}

  signUp() {
    // Create a new contact and insert it into database.
    this.userservice.adduser(this.data).then((res: any) => {
        if (res.success)
        this.navCtrl.push('SigninPage');
      else
        alert('Error' + res);
    })
  }

}
