import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'Firebase';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;

  data = { 
    type:'', 
    nickname:'', 
    message:'' 
  };
  buddy: string;

  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;

constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.roomkey = this.navParams.get("key") as string;
  this.data.nickname = this.navParams.get("nickname") as string;
  this.buddy = this.navParams.get("buddy") as string;
  this.data.type = 'message';
  this.data.nickname = firebase.auth().currentUser.displayName;
  this.nickname = firebase.auth().currentUser.displayName;


  firebase.database().ref('privatechat/'+this.roomkey+'/chats').on('value', resp => {
    this.chats = [];
    this.chats = snapshotToArray(resp);
    setTimeout(() => {
      if(this.offStatus === false) {
        this.content.scrollToBottom(300);
      }
    }, 1000);
  });
}

  sendMessage() {
    let newData = firebase.database().ref('privatechat/'+this.roomkey+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
  }

  exitChat() {
    let exitData = firebase.database().ref('privatechats/'+this.roomkey+'/chats').push();
    exitData.set({
      type:'exit',
      user:this.nickname,
      message:' has exited this room.',
      sendDate:Date()
    });

    this.offStatus = true;

    this.navCtrl.setRoot(ContactPage, {
      nickname:this.nickname
    });
  }
}

  export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
  };