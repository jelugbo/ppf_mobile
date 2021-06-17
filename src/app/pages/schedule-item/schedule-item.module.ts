import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleItemPageRoutingModule } from './schedule-item-routing.module';

import { ScheduleItemPage } from './schedule-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleItemPageRoutingModule
  ],
  declarations: [ScheduleItemPage]
})
export class ScheduleItemPageModule {}
