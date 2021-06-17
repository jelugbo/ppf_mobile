import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiveinfoPageRoutingModule } from './giveinfo-routing.module';

import { GiveinfoPage } from './giveinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiveinfoPageRoutingModule
  ],
  declarations: [GiveinfoPage]
})
export class GiveinfoPageModule {}
