import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpdeskmodalPage } from './helpdeskmodal.page';

const routes: Routes = [
  {
    path: '',
    component: HelpdeskmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpdeskmodalPageRoutingModule {}
