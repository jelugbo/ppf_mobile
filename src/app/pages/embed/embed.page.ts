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
    this.clipSrc = this.route.snapshot.data.special;
  }
}
