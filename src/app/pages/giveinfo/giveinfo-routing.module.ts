import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiveinfoPage } from './giveinfo.page';

const routes: Routes = [
  {
    path: '',
    component: GiveinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiveinfoPageRoutingModule {}
