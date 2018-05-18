
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RoomPage } from '../pages/room/room';
import { AddRoomPage } from '../pages/add-room/add-room';
import { Contacts } from '@ionic-native/contacts';
import { HttpClientModule } from '@angular/common/http'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth'

import { UserserviceProvider } from '../providers/userservice/userservice';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { MessageserviceProvider } from '../providers/messageservice/messageservice';


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCXXzLbJtsiUwAzAq6_FgKGt_XmPhkLxBQ",
    authDomain: "finalproject-97840.firebaseapp.com",
    databaseURL: "https://finalproject-97840.firebaseio.com",
    projectId: "finalproject-97840",
    storageBucket: "finalproject-97840.appspot.com",
    messagingSenderId: "22820808404"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoomPage,
    AddRoomPage,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
   
    MyApp,
    HomePage,
    RoomPage,
    AddRoomPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserserviceProvider,
    AuthenticationProvider,
    MessageserviceProvider
  ]
})
export class AppModule {}
