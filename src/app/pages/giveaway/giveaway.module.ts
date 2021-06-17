import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiveawayPageRoutingModule } from './giveaway-routing.module';

import { GiveawayPage } from './giveaway.page';
import {SharedModule} from '../../shared.module';
import {UploadPageModule} from '../upload/upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiveawayPageRoutingModule,
    SharedModule,
      UploadPageModule
  ],
  declarations: [GiveawayPage]
})
export class GiveawayPageModule {}
