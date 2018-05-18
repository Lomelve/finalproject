import { MessagePage } from './../message/message';
import { UserserviceProvider } from './../../providers/userservice/userservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Contact } from '../../models/Contact';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contacts = [];
  firedata = firebase.database().ref('contacts/');

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice:UserserviceProvider) {
  userservice.getallusers().then((res: any) => {
    this.contacts = res;
   
 })
  }
  ionViewDidLoad() {}

  openChat(contact) {
    this.navCtrl.setRoot('MessagePage', {
      contact:contact
    });
  }

}




