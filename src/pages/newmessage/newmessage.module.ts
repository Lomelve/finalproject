import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewmessagePage } from './newmessage';

@NgModule({
  declarations: [
    NewmessagePage,
  ],
  imports: [
    IonicPageModule.forChild(NewmessagePage),
  ],
})
export class NewmessagePageModule {}
