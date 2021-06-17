import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundmodalPageRoutingModule } from './fundmodal-routing.module';

import { FundmodalPage } from './fundmodal.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FundmodalPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [FundmodalPage]
})
export class FundmodalPageModule {}
