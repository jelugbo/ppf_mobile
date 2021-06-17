import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpdesksPageRoutingModule } from './helpdesks-routing.module';

import { HelpdesksPage } from './helpdesks.page';
import {SharedModule} from '../../shared.module';
import {HelpdeskmodalPageModule} from '../helpdeskmodal/helpdeskmodal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpdesksPageRoutingModule,
    SharedModule,
      HelpdeskmodalPageModule
  ],
  declarations: [HelpdesksPage]
})
export class HelpdesksPageModule {}
