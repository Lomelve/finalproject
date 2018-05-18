import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Contact } from '../../models/Contact';
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public mAuthentication : AngularFireAuth) {
    console.log('Hello AuthenticationProvider Provider');
    
  }

  login(userInformation:Contact ) {
    var promise = new Promise((resolve, reject) => {
      this.mAuthentication.auth.signInWithEmailAndPassword(userInformation.email, userInformation.password)
      .then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })
 
    return promise;
    
  }
/*auth
        .signInWithEmailAndPassword(this.data.email, this.data.password)
        .then(user => {
          this.navCtrl.setRoot(ContactPage, {
            nickname: user.displayName
          });
        })*/

}
