import { Component, OnInit } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-newsitem',
  templateUrl: './newsitem.page.html',
  styleUrls: ['./newsitem.page.scss'],
})
export class NewsitemPage implements OnInit {
  public item: any;
  constructor(private socialSharing: SocialSharing, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.data.special) {
      this.item = this.route.snapshot.data.special;
    }
  }

}
