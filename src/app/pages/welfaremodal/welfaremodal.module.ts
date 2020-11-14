import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelfaremodalPageRoutingModule } from './welfaremodal-routing.module';

import { WelfaremodalPage } from './welfaremodal.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WelfaremodalPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [WelfaremodalPage]
})
export class WelfaremodalPageModule {}
