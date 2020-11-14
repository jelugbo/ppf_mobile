import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulerPageRoutingModule } from './scheduler-routing.module';

import { SchedulerPage } from './scheduler.page';
import {SharedModule} from '../../shared.module';
import { PopoverPageModule } from '../popover/popover.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SchedulerPageRoutingModule,
        SharedModule,
        PopoverPageModule
    ],
  declarations: [SchedulerPage]
})
export class SchedulerPageModule {}
