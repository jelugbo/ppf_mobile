import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelfaremodalPage } from './welfaremodal.page';

const routes: Routes = [
  {
    path: '',
    component: WelfaremodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelfaremodalPageRoutingModule {}
