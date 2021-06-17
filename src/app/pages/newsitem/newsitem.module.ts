import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsitemPageRoutingModule } from './newsitem-routing.module';

import { NewsitemPage } from './newsitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsitemPageRoutingModule
  ],
  declarations: [NewsitemPage]
})
export class NewsitemPageModule {}
