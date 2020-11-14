import { Component, OnInit } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Calendar} from '@ionic-native/calendar/ngx';
import {InfoService} from '../../services/info.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public item: any;
  constructor(private socialSharing: SocialSharing, private router: Router, private route: ActivatedRoute,
              private alertCtrl: AlertController, private calendar: Calendar, private infoService: InfoService) { }

  shareUs(item) {
    const options = {
      message: 'Event: \n' + item.title, // not supported on some apps (Facebook, Instagram)
      subject: item.title, // fi. for email
      files: ['assets/img/rccg_logo.png'], // an array of filenames either locally or remotely
      url: 'https://www.winnerschapelny.org',
      chooserTitle: 'WCINY' // Android only, you can override the default share sheet title
    };

    this.socialSharing.shareWithOptions(options).catch((err) => {
      console.log(err);
    });
  }

  getDay(str){
    const days = ['SUNDAY', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const strDate = (str instanceof Date) ? str : this.parseDate(str);
    return days[strDate.getDay()];
  }

  getNum(str){
    const strDate = (str instanceof Date) ? str : this.parseDate(str);
    return strDate.getDate();
  }

  parseDate(input) {
    const parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }
  doHTML(str, rem){
    console.log(str);
    return str.replace(/<(?:.|\n)*?>/gm, '').replace(rem, '');
  }

  doDate(d, t){
    const str = d.slice(0, 10) + ' ' + t;
    console.log(str);
    return new Date(str);

  }

  createEvent(item) {
    const start = this.doDate(item.event_date, item.StartTime);
    const end = this.doDate(item.event_date, item.StartTime);

    this.calendar.createEventInteractively(
        item.introtext,
        item.event_venue,
        this.doHTML(item.content, item.introtext),
        new Date(start),
        new Date(end)
    ).then(
        (msg) => {
          this.presentAlert('Event Calendar', item.introtext + ' has been added to your calendar.');
          console.log(msg);
        },
        (err) => { console.log('Calendar fail ' + err); }
    );
  }

  async presentAlert(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  openEmbed(url){
    const a  = document.createElement('a');
    a.href = url;
    console.log(a.host);
    if (a.host && a.host !== window.location.host){
      this.infoService.setData(1, url);
      this.router.navigateByUrl('/menu/embed/1');
    }else{
      this.presentAlert('Event Registration', 'Registration link has not been provided');
    }
  }

  ngOnInit() {
    if (this.route.snapshot.data.special) {
      this.item = this.route.snapshot.data.special;
    }
  }

}
