import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialsPageRoutingModule } from './socials-routing.module';

import { SocialsPage } from './socials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialsPageRoutingModule
  ],
  declarations: [SocialsPage]
})
export class SocialsPageModule {}
