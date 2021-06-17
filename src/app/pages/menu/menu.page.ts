import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {DataService} from '../../services/data.service';
import {InfoService} from '../../services/info.service';
import {InAppBrowserOptions, InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
public pages = [
/*  {
    title: 'Home',
    url: '/menu/tabs',
    icon: 'home'
  },*/
  {
  title: 'Training',
    url: '/menu/training',
    external: false,
    icon: 'school'
  },
  {
    title: 'Information',
    url: '/menu/information',
    external: false,
    icon: 'information-circle'
  },
  {
    title: 'Asset Give Away',
    url: '/menu/giveaway',
    external: false,
    icon: 'heart-circle'
  },
  {
    title: 'Celebration/Events',
    url: '/menu/events',
    external: false,
    icon: 'calendar'
  },
  {
    title: 'Meetings',
    url: '/menu/meetings',
    external: false,
    icon: 'people-circle'
  },
  {
    title: 'Donation (Give)',
    url: 'https://donate.rccgna.org',
    external: true,
    icon: 'wallet'
  },
/*  {
    title: 'Privacy Policy',
    url: '/menu/privacy',
    icon: 'document-text'
  },
   {
    title: 'News',
    url: '/menu/news',
    icon: 'newspaper'
  },
*/
  {
    title: 'Welfare',
    url: '/menu/welfares',
    external: false,
    icon: 'heart'
  },
  {
    title: 'Notification',
    url: '/menu/notifications',
    external: false,
    icon: 'notifications'
  },
  {
    title: 'Helpdesk',
    url: '/menu/helpdesks',
    external: false,
    icon: 'help-circle'
  },
  {
    title: 'Livestream',
    url: 'https://www.youtube.com/c/RCCGNAO/featured',
    external: true,
    target: '_system',
    icon: 'videocam'
  },
  {
    title: 'RCCG North America',
    url: 'https://rccgamericas.org/rccg-north-america/',
    external: true,
    icon: 'home'
  },
  {
    title: 'RCCG South America',
    url: 'https://rccgamericas.org/rccg-south-america/',
    external: true,
    icon: 'home'
  },
  {
    title: 'RCCG Central America',
    url: 'https://rccgamericas.org/rccg-central-america/',
    external: true,
    icon: 'home'
  },
  {
    title: 'RCCG Caribbean',
    url: 'https://rccgamericas.org/rccg-caribbean/',
    external: true,
    icon: 'home'
  },
  {
    title: 'RCCG Pacific',
    url: 'https://rccgamericas.org/rccg-pacific/',
    external: true,
    icon: 'home'
  }
];
selectedPath = '';
  constructor(private router: Router, private appBrowser: InAppBrowser, private infoService: InfoService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;

      }
    });
  }

  options: InAppBrowserOptions = {
    location : 'yes', // Or 'no'
    hidden : 'no', // Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes', // Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', // Android only
    closebuttoncaption : 'Close', // iOS only
    disallowoverscroll : 'no', // iOS only
    toolbar : 'yes', // iOS only
    enableViewportScale : 'no', // iOS only
    allowInlineMediaPlayback : 'no', // iOS only
    presentationstyle : 'pagesheet', // iOS only
    fullscreen : 'yes', // Windows only
  };

  ngOnInit() {
  }

  openEmbed(url) {
    const a = document.createElement('a');
    a.href = url;
    console.log(a.host);
    if (a.host && a.host !== window.location.host) {
      this.infoService.setData(1, url);
      this.router.navigateByUrl('/menu/embed/1');
    }
  }

  public cordovaBrowse(url: string, target= '_self'){
    this.appBrowser.create(url, target, this.options);
  }
  public systemBrowse(url: string){
    const target = '_self';
    this.appBrowser.create(url, target, this.options);
  }
}
