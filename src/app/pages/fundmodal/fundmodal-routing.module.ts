import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundmodalPage } from './fundmodal.page';

const routes: Routes = [
  {
    path: '',
    component: FundmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundmodalPageRoutingModule {}
