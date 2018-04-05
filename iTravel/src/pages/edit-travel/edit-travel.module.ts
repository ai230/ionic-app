import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTravelPage } from './edit-travel';

@NgModule({
  declarations: [
    EditTravelPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTravelPage),
  ],
})
export class EditTravelPageModule {}
