import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {AlertController, Platform} from '@ionic/angular';
import {InfoService} from '../../services/info.service';
import {Storage} from '@ionic/storage';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  americas = 'https://rccgamericas.org/';
  constructor(private navCtrl: Router, private apiCall: DataService, private alertCtrl: AlertController,
              private infoService: InfoService, private storage: Storage, private push: FCM,
              private appBrowser: InAppBrowser, private platform: Platform, private sqlite: SQLite) { }
  options: InAppBrowserOptions = {
    location : 'no', // Or 'no'
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
  public systemBrowse(url: string){
    const target = '_self';
    this.appBrowser.create(url, target, this.options);
  }

  navigate(opt, isURL) {
    let link = '';
    console.log(opt);
    switch (opt) {
      case 'training':
        link = '/menu/training';
        break;
      case 'information':
        link = '/menu/information';
        break;
      case 'welfare':
        link = '/menu/welfares';
        break;
      case 'meeting':
        link = '/menu/meetings';
        break;
      case 'helpdesk':
        link = '/menu/helpdesks';
        break;
      case 'socials':
        link = '/menu/socials';
        break;
      case 'credit':
        link = 'https://redeemerfcu.org/';
        break;
      case 'give':
      case 'live':
        this.infoService.setData(2, 'opt');
        link = 'https://donate.rccgna.org';
        break;
      case 'asset':
        link = '/menu/giveaway';
        break;
      default:
        link = '/home';
        break;
    }
    isURL ? this.systemBrowse(link) : this.navCtrl.navigate([link]);

  }

  ngOnInit() {
  }

}
