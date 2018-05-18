import { MessageserviceProvider } from './../../providers/messageservice/messageservice';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import * as firebase from 'Firebase';
import { ContactPage } from '../contact/contact';

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
  @ViewChild(Content) content: Content;
  contact: any;
  newmessage;
  allMessages = [];


constructor(public navCtrl: NavController, public navParams: NavParams,
  public messageservice: MessageserviceProvider, public events: Events, public zone :NgZone) {
    this.contact= messageservice.contact;
    this.events.subscribe('newmessage', () => {
      this.allMessages = [];
      this.zone.run(() => {
        this.allMessages = this.messageservice.allmessages;
      })
      
      
    })

}
addmessage() {
  this.messageservice.addnewmessage(this.newmessage).then(() => {
    this.content.scrollToBottom();
    this.newmessage = '';
  })
}
ionViewDidEnter() {
  this.messageservice.getallmessages();
}



  }
