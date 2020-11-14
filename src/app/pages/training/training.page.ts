import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {InfoService} from '../../services/info.service';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  itemList;
  selectedDate;
  showEvent;
  public dates: any;

  constructor(private navCtrl: Router, private apiCall: DataService, private alertCtrl: AlertController,
              private infoService: InfoService) { }

  getEvents(a){
     const e = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
   // const e = '2020-09-17';
     console.log(e);
     this.apiCall.fetchData('pluck/events/Training/' + e, '', false).subscribe(
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

  ngOnInit() {
    this.dates = new Date();
    this.getEvents(new Date());
  }

}
