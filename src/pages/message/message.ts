import { MessageserviceProvider } from './../../providers/messageservice/messageservice';
import { Contact } from './../../models/Contact';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import * as firebase from 'firebase';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer/';
import * as crypto from 'crypto-browserify';



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
  kmessages= [];

 constructor(public navCtrl: NavController, public navParams: NavParams,
 public messageservice: MessageserviceProvider, public events : Events, public zone :NgZone  ) {
  this.contact = this.messageservice.contact; 
  this.events.subscribe('newmessage', () => {
    this.allmessages = [];
    this.kmessages=[];
   this.allmessages = this.messageservice.allmessages;
    this.decrypt(this.allmessages);

  })  
  }

  decrypt(mymessages){
    
    for(var message of mymessages){
    
      let decrypted = CryptoJS.AES.decrypt(message.message, 'TheKey%%123');
      var dec= decrypted.toString(CryptoJS.enc.Utf8);
      this.kmessages.push(dec);
      
 
  }

 
  }

  addmessage() {
     this.messageservice.addnewmessage(this.newmessage).then(() => {
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.messageservice.getallmessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  exitChat() {
  this.navCtrl.push('ContactPage');
  }

}
