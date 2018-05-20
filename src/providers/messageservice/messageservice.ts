import { key } from './../../models/Key';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Events } from 'ionic-angular';
import CryptoJS from 'crypto-js';

/*
  Generated class for the MessageserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageserviceProvider {
  firemessages = firebase.database().ref('/chats');
  contact;
  displayName;
  allmessages= [];
  enc;
  msg;
  kmessages = [];
  thekey;
  mkey = {} as key;
  
  constructor(public events: Events) {
    console.log('Hello MessageserviceProvider Provider');
  
  }
  addContact(contact) {
    this.contact = contact;
   
  
  }
  addnewmessage(msg) {

    if (this.contact) {
      var promise = new Promise((resolve, reject) => {
        let encrypted = CryptoJS.AES.encrypt(msg, 'TheKey%%123');
        this.enc = encrypted.toString();
      
        this.firemessages.child(firebase.auth().currentUser.uid).child(this.contact.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: this.enc
         /* diyelim ki ben mesaj attım benim contactimın sayfasında gözüküyor
         */
       
        }).then(() => {
          this.firemessages.child(this.contact.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: this.enc, // benim contactımda da ben varım yani bana mesaj atınca gelen
      
          }).then(() => {
            resolve(true);
            })
        })
      })
      return promise;
    }
  }



  getallmessages() {
    let temp;
    this.firemessages.child(firebase.auth().currentUser.uid).child(this.contact.uid).on('value', (snapshot) => {
      this.allmessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
      
        this.allmessages.push(temp[tempkey]);
      }

   
      this.events.publish('newmessage');
    })
  }

}
