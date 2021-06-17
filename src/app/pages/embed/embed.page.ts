import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.page.html',
  styleUrls: ['./embed.page.scss'],
})
export class EmbedPage implements OnInit {
  clipSrc: string;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const choice = this.route.snapshot.data.special;
    switch (choice) {
      case 'live':
        this.clipSrc = 'https://www.youtube.com/c/RCCGNAO/featured';
        break;
      case 'donate':
        this.clipSrc = 'https://donate.rccgna.org';
        break;
      case 'north':
        this.clipSrc = 'https://rccgamericas.org/rccg-north-america/';
        break;
      case 'south':
        this.clipSrc = 'https://rccgamericas.org/rccg-south-america/';
        break;
        case 'central':
        this.clipSrc = 'https://rccgamericas.org/rccg-central-america/';
        break;
      case 'caribbean':
        this.clipSrc = 'https://rccgamericas.org/rccg-caribbean/';
        break;
      case 'pacific':
        this.clipSrc = 'https://rccgamericas.org/rccg-pacific/';
        break;
      default:
        this.clipSrc = this.route.snapshot.data.special;
    }
  }
}
