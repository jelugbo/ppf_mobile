import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelfaresPage } from './welfares.page';

const routes: Routes = [
  {
    path: '',
    component: WelfaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelfaresPageRoutingModule {}
