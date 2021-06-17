import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundinfoPageRoutingModule } from './fundinfo-routing.module';

import { FundinfoPage } from './fundinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundinfoPageRoutingModule
  ],
  declarations: [FundinfoPage]
})
export class FundinfoPageModule {}
