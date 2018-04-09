import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMemoPage } from './edit-memo';

@NgModule({
  declarations: [
    EditMemoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMemoPage),
  ],
})
export class EditMemoPageModule {}
