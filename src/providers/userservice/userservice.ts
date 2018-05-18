import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'
/*
  Generated class for the UserserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserserviceProvider {
  firedata = firebase.database().ref('/chatusers');
  constructor(public userFire:AngularFireAuth) {
    console.log('Hello UserserviceProvider Provider');
    
  }
  adduser(newContact) {
    var promise = new Promise((resolve, reject) => {
      this.userFire.auth.createUserWithEmailAndPassword(newContact.email, newContact.password).then(() => {
        this.userFire.auth.currentUser.updateProfile({
          displayName: newContact.displayName,
          photoURL:null
        }).then(() => {
          this.firedata.child(this.userFire.auth.currentUser.uid).set({
            uid: this.userFire.auth.currentUser.uid,
            displayName: newContact.displayName,
            photoURL:null
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
          })
          }).catch((err) => {
            reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
