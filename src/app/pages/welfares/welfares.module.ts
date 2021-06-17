import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelfaresPageRoutingModule } from './welfares-routing.module';

import { WelfaresPage } from './welfares.page';
import {SharedModule} from '../../shared.module';
import {WelfaremodalPageModule} from '../welfaremodal/welfaremodal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelfaresPageRoutingModule,
      SharedModule,
      WelfaremodalPageModule
  ],
  declarations: [WelfaresPage]
})
export class WelfaresPageModule {}
