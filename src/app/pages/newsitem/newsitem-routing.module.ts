import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsitemPage } from './newsitem.page';

const routes: Routes = [
  {
    path: '',
    component: NewsitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsitemPageRoutingModule {}
