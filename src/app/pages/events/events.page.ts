import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {InfoService} from '../../services/info.service';
import {AlertController} from '@ionic/angular';
import {SQLiteObject} from '@ionic-native/sqlite';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {Storage} from '@ionic/storage';
// import { FCM } from '@ionic-native/fcm/ngx';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  itemList;
  selectedDate;
  showEvent;
  Role;
  public dates: any;
  constructor(private navCtrl: Router, private apiCall: DataService, private alertCtrl: AlertController,
              private infoService: InfoService, private storage: Storage, private push: FCM,
              private platform: Platform, private sqlite: SQLite) { }

  getEvents(a){
    const e = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
    // const e = '2020-09-17';
    console.log(e);
    this.apiCall.fetchData('pluck/events/Event/' + e, '', false).subscribe(
        data => {
          this.showEvent = !!(Array.isArray(data.info) && data.info.length > 0);
          console.log(this.showEvent);
          console.log(data.info);
          this.itemList = this.groupData(data.info);
          console.log( this.itemList);
        },
        err => console.error(err),
        () => console.log('Fetch Trainings Completed')
    );

  }

  groupData(data){
    return data.reduce((r, ab) => {
      r[this.getDate(ab.StartDate)] = [...r[this.getDate(ab.StartDate)] || [], ab];
      return r;
    }, {});
  }

  goNext() {
    this.itemList = [];
    const currentDate = new Date(this.dates);
    currentDate.setMonth(currentDate.getMonth() + 1);
    this.dates = currentDate;
    this.getEvents(currentDate);
    console.log(currentDate);
  }

  goBack() {
    this.itemList = [];
    const currentDate = new Date(this.dates);
    currentDate.setMonth(currentDate.getMonth() - 1);
    this.dates = currentDate;
    this.getEvents(currentDate);
  }

  doDate(d, t){
    console.log(d);
    const str = d.slice(0, 10) + ' ' + t;
    return this.parseDate(str);
  }

  getDate(d){
    return d.slice(0, 10) ;
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

  getMon(str){
    const strDate = (str instanceof Date) ? str : this.parseDate(str);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months[strDate.getMonth()];
  }

  // parse a date in yyyy-mm-dd format
  parseDate(input) {
    const parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }



  itemTapped(item){
    console.log(item.value[0]);
    this.infoService.setData(item.value[0].Id, item);
    this.navCtrl.navigateByUrl('/menu/event/' + item.value[0].Id);
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
      this.navCtrl.navigateByUrl('/menu/embed/1');
    }else{
      this.presentAlert('Event Registration', 'Registration link has not been provided');
    }
  }

  createDbs(){
    if (!this.platform.is('cordova')) {
      console.warn('SQLite not initialized. Cordova is not available - Run in physical device');
      return;
    }
    this.sqlite.create({
      name: 'ppforum.db',
      location: 'default'
    })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS messages (id integer primary key, date text, title text, message text)', [])
              .then(() => console.log('Executed SQL Create messages table'))
              .catch(e => console.log(e));
          db.executeSql('CREATE TABLE IF NOT EXISTS notes (id integer primary key, date text, time text, topic text, content text, venue text)', [])
              .then(() => console.log('Executed SQL Create Notes table'))
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }

  setPushThings(){
    this.apiCall.fetchData('pluck/notifications', '', false).subscribe(
        data => {
          console.log(data);
          const upData = data.info;
          const env = this;
          if (Object.keys(upData).length > 0) { /*Do we have Push settings from server?*/
            this.storage.get('pushSettings')
                .then( (dat) => {
                  console.log(upData);
                  const downData = (dat === null) ? [] : JSON.parse(dat);
                  console.log(downData);
                  /*Update Push settings*/
                  Object.keys(upData).forEach((k) => {
                    const pik  = downData.filter((o) => o[upData[k].Id])[0];
                    console.log(pik);
                    if (upData[k].Enabled){ // Subscribe to Topic env.push.hasPermission() &&
                      const grp = this.Role + (upData[k].GroupName).replace(/\s/g, '-');
                      console.log(grp);
                      env.push.subscribeToTopic(grp);
                    }
                    if (typeof pik !== 'undefined') {
                      if (pik[upData[k].Id].GroupName !== upData[k].GroupName){
                        pik[upData[k].Id].GroupName = upData[k].GroupName;
                      }
                    } else {
                      downData.push({[upData[k].Id] : upData[k]});
                    }
                  });
                  console.log(downData);
                  env.storage.set('pushSettings', JSON.stringify(downData));
                }, (error) => {
                  console.log('No Push Settings Stored ' + error);
                });

          }
        },
        err => console.error(err),
        () => console.log('Fetch Notifications Completed')
    );
  }

  ionViewDidEnter(){
    /*Get Notification Data and Subscribe to topics here*/
    console.log('Now we Did Enter');
    this.createDbs();
    this.setPushThings();
  }

  ngOnInit() {
    this.dates = new Date();
    this.getEvents(new Date());
    this.Role = localStorage.getItem('ROLE_ID');
/*    this.storage.get('USER_PASS').then(user => {
      this.Role = localStorage.getItem('ROLE_ID');
    });*/
  }

}
