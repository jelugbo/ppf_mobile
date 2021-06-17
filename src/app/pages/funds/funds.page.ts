import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController, AlertController} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {InfoService} from '../../services/info.service';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {FundmodalPage} from '../fundmodal/fundmodal.page';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.page.html',
  styleUrls: ['./funds.page.scss'],
})
export class FundsPage implements OnInit {
  showItems;
  itemList;

  constructor(private modalCtrl: ModalController, private apiCall: DataService, private infoService: InfoService,
              private socialSharing: SocialSharing, private toastControllar: ToastController,
              private storage: Storage, private router: Router, private alertCtrl: AlertController) { }

  getItems(){
    const a = new Date();
    const exp =  a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
    this.apiCall.fetchData('pluck/funds' , 'Type=Fund&ExpiryDate=' + exp, false).subscribe(
        data => {
          this.showItems = !!(Array.isArray(data.info) && data.info.length > 0);
          console.log(this.showItems);
          this.itemList = data.info;
          console.log( this.itemList);
        },
        err => console.error(err),
        () => console.log('Fetch News Completed')
    );
  }

  shareUs(item) {
    console.log(item);
    const options = {
      message: 'Giveaway: \n' + item.Title, // not supported on some apps (Facebook, Instagram)
      subject: item.title, // fi. for email
      files: [item.Images], // an array of filenames either locally or remotely
      url: 'https://rccgamericas.app',
      chooserTitle: 'PPFORUM' // Android only, you can override the default share sheet title
    };
    this.socialSharing.shareWithOptions(options).catch((err) => {
      console.log(err);
    });
  }

  async presentToast(text) {
    console.log('in presentToast');
    const toast = await this.toastControllar.create({
      message: text,
      position: 'middle',
      duration: 4500
    });
    toast.present();
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
    console.log(url, a.host);
    if (a.host && a.host !== window.location.host){
      this.infoService.setData(1, url);
      this.router.navigateByUrl('/menu/embed/1');
    }else{
      this.presentAlert('Fund Raising', 'Donation link has not been provided');
    }
  }


  async addNew(){
    const pageModal = await this.modalCtrl.create({
      component: FundmodalPage
    });

    await pageModal.present();
    const { data } = await pageModal.onDidDismiss();
    this.getItems();
    console.log(data);
  }

  itemTapped(item){
    console.log(item);
    this.infoService.setData(item.Id, item);
    this.router.navigateByUrl('/menu/fundinfo/' + item.Id);
  }
  ngOnInit(){
    this.getItems();
  }

}
