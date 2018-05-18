import { MessageserviceProvider } from './../../providers/messageservice/messageservice';
import { Contact } from './../../models/Contact';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  //contact : Contact= this.navParams.get("contact") as Contact;
  uid = this.navParams.get("contactuid") as Contact;
  firemessages= firebase.database().ref('/messages');
  contact : any;
  allmessages = []; 
  newmessage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
 public messageservice: MessageserviceProvider, public events : Events, public zone :NgZone  ) {
  this.contact = this.messageservice.contact;
 // this.scrollto();
  this.events.subscribe('newmessage', () => {
    this.allmessages = [];
   // this.zone.run(() => {
      this.allmessages = this.messageservice.allmessages;
  //  })
    
    
  })
    
  }

  addmessage() {
    this.messageservice.addnewmessage(this.newmessage).then(() => {
     // this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.messageservice.getallmessages();
  }

  /*scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }*/


  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  exitChat() {
  this.navCtrl.push('ContactPage');
  }

}
