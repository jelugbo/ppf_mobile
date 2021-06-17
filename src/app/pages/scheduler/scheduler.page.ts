import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {InfoService} from '../../services/info.service';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {ModalController, ToastController} from '@ionic/angular';
import {PopoverPage} from '../popover/popover.page';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  public notes;
  public dates;
  public showNotes;
  // selectedItem : any;
  constructor(private navCtrl: Router, private apiCall: DataService, private sqlite: SQLite,
              private toastCtrl: ToastController, private infoService: InfoService,
              public modalCtrl: ModalController) {}

  getNotes(){
    const mth = ('0' + (this.dates.getMonth() + 1)).slice(-2);
    // SELECT strftime('%s','now') SELECT id, date, topic, content FROM notes WHERE strftime('%m',date) > ? ORDER BY id DESC
    console.log(mth);
    this.sqlite.create({
      name: 'ppforum.db',
      location: 'default'
    })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT id, date, time, venue, topic, content FROM notes WHERE strftime(\'%m\',date) = ? ORDER BY id DESC', [mth])
              .then((data) => {
                this.showNotes = true; // !!(Array.isArray(data.rows) && data.rows.length > 0);
                const items = [];
                if (data.rows.length > 0 ){
                  console.log(data.rows);
                  for (let i = 0; i < data.rows.length; i++) {
                    items.push(data.rows.item(i));
                  }
                  console.log(items);
                  this.notes = this.groupData(items);
                }
              })
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }

  groupData(data){
    return data.reduce((r, ab) => {
      r[this.getDate(ab.date)] = [...r[this.getDate(ab.date)] || [], ab];
      return r;
    }, {});
  }

  getDate(d){
    return d.slice(0, 10) ;
  }

  async editMe(note){
    console.log(note);
    const modal = await this.modalCtrl.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: note
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.getNotes();
    console.log(data);
  }

  async addNew(){
    const pageModal = await this.modalCtrl.create({
      component: PopoverPage
    });

    await pageModal.present();
    const { data } = await pageModal.onDidDismiss();
    this.getNotes();
    console.log(data);
  }

  onModalDismiss(){
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  onItemDelete(item) {
    this.sqlite.create({
      name: 'wciny.db',
      location: 'default'
    })
        .then((db: SQLiteObject) => {
          db.executeSql('DELETE FROM notes WHERE id = ?', [item.id])
              .then((data) => {
                console.log(data);
                this.getNotes();
                this.presentToast('Note successfully deleted');
              })
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
    await toast.present();
  }

  goNext() {
    this.notes = [];
    this.dates = new Date(this.dates);
    this.dates.setMonth(this.dates.getMonth() + 1);
    this.getNotes();
    console.log(this.dates);
  }

  goBack() {
    this.notes = [];
    this.dates = new Date(this.dates);
    this.dates.setMonth(this.dates.getMonth() - 1);
    this.getNotes();
  }

  getDay(str){
    const days = ['SUNDAY', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const strDate = (str instanceof Date) ? str : new Date(str);
    return days[strDate.getUTCDay()];
  }

  getMon(str){
    const strDate = (str instanceof Date) ? str : new Date(str);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months[strDate.getMonth()];
  }

  getNum(str){
    const strDate = (str instanceof Date) ? str : new Date(str);
    return strDate.getUTCDate();
  }

  itemTapped(item){
    console.log(item.value[0]);
    this.infoService.setData(item.value[0].Id, item);
    this.navCtrl.navigateByUrl('/menu/schedule/' + item.value[0].Id);
  }

  ngOnInit() {
    this.dates = new Date();
    this.getNotes();
  }
}
