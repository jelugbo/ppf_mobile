import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpdesksPage } from './helpdesks.page';

const routes: Routes = [
  {
    path: '',
    component: HelpdesksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpdesksPageRoutingModule {}
