import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundinfoPage } from './fundinfo.page';

const routes: Routes = [
  {
    path: '',
    component: FundinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundinfoPageRoutingModule {}
