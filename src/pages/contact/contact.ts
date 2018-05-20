import { UserserviceProvider } from './../../providers/userservice/userservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Contact } from '../../models/Contact';
import { MessageserviceProvider } from '../../providers/messageservice/messageservice';
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
  buddyid;
  firedata = firebase.database().ref('contacts/');
  currentUserId=firebase.auth().currentUser.uid;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     public userservice:UserserviceProvider, public messageservice:MessageserviceProvider) {
  userservice.getallusers().then((res: any) => {
    this.contacts = res;
    
    //alert(this.currentUserId);
 })
  }
  ionViewDidLoad() {}

  openChat(contact) {
    this.buddyid= contact.uid;
   // this.contactName= contact.disp
   // alert(this.buddyid);
    this.messageservice.addContact(contact);
    this.navCtrl.setRoot('MessagePage', {
      //contact: contact,
    //  contactuid: this.buddyid
    });
  }

}




