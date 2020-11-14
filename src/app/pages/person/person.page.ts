import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  public item: any;
  constructor(private socialSharing: SocialSharing, private route: ActivatedRoute, private router: Router) { }

  getImage(url) {
    const a = document.createElement('a');
    a.href = url;
    console.log(url, a.host);
    return this.isURL(url) ? url : 'assets/img/rccg_logo.png';
  }

  isURL(str){
    try {
      const a = new URL(str);
    } catch (_) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    if (this.route.snapshot.data.special) {
      this.item = this.route.snapshot.data.special;
      console.log(this.item);
    }
  }

}
