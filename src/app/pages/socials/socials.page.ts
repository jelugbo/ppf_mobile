import { Component, OnInit } from '@angular/core';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.page.html',
  styleUrls: ['./socials.page.scss'],
})
export class SocialsPage implements OnInit {

  public itemColumns = [
 {
      title: 'Youtube',
      icon: 'logo-youtube',
      text: 'Watch Our Channel',
      isURL: true,
      link: 'https://www.youtube.com/rccgnao'
    }, {
      title: 'Twitter',
      icon: 'logo-twitter',
      text: 'Connect With Us',
      isURL: true,
      link: 'https://twitter.com/rccgnao'
    }, {
      title: 'Facebook',
      icon: 'logo-facebook',
      text: 'Connect With Us',
      isURL: true,
      link: 'https://www.facebook.com/rccgnao'
    },

  ];
  constructor(private apiCall: DataService, private appBrowser: InAppBrowser, public navCtrl: Router) { }
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
  public cordovaBrowse(url: string){
    const target = '_self';
    this.appBrowser.create(url, target, this.options);
  }

  public systemBrowse(url: string){
    const target = '_system';
    this.appBrowser.create(url, target, this.options);
  }

  navigate(opt, isURL) {
    console.log(opt);
    isURL ? this.systemBrowse(opt) : this.navCtrl.navigate([opt]);

  }

  ngOnInit() {
  }

}
