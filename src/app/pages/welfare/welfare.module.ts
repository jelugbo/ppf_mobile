import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelfarePageRoutingModule } from './welfare-routing.module';

import { WelfarePage } from './welfare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelfarePageRoutingModule
  ],
  declarations: [WelfarePage]
})
export class WelfarePageModule {}
