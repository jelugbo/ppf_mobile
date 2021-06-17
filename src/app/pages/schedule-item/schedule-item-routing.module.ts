import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleItemPage } from './schedule-item.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleItemPageRoutingModule {}
