import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Events } from 'ionic-angular';
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
  constructor(public events: Events) {
    console.log('Hello MessageserviceProvider Provider');
    
  }
  addContact(contact) {
    this.contact = contact;
   
  
  }
  addnewmessage(msg) {
    if (this.contact) {
      var promise = new Promise((resolve, reject) => {
        this.firemessages.child(firebase.auth().currentUser.uid).child(this.contact.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg
         
        }).then(() => {
          this.firemessages.child(this.contact.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
      
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
