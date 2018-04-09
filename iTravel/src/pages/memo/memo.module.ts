import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemoPage } from './memo';

@NgModule({
  declarations: [
    MemoPage,
  ],
  imports: [
    IonicPageModule.forChild(MemoPage),
  ],
})
export class MemoPageModule {}
