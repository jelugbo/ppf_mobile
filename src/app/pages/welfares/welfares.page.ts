import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {InfoService} from '../../services/info.service';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {WelfaremodalPage} from '../welfaremodal/welfaremodal.page';

@Component({
  selector: 'app-welfares',
  templateUrl: './welfares.page.html',
  styleUrls: ['./welfares.page.scss'],
})
export class WelfaresPage implements OnInit {
  showItems;
  itemList;

  constructor(private modalCtrl: ModalController, private apiCall: DataService, private infoService: InfoService,
              private socialSharing: SocialSharing, private toastControllar: ToastController,
              private storage: Storage, private router: Router, private alertCtrl: AlertController) { }

  getItems(){
    const a = new Date();
    const exp =  a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
    this.apiCall.fetchData('pluck/funds' , 'IsPrivate=0&Type=Welfare&ExpiryDate=' + exp, false).subscribe(
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
      url: 'https://www.rccgnappf.org.org',
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
      component: WelfaremodalPage
    });

    await pageModal.present();
    const { data } = await pageModal.onDidDismiss();
    this.getItems();
    console.log(data);
  }

  itemTapped(item){
    console.log(item);
    this.infoService.setData(item.Id, item);
    this.router.navigateByUrl('/menu/welfare/' + item.Id);
  }

  requestor(item){
    this.storage.get('USER_ID').then(
        (id) => {
          const putData = {RequestorId: id, Type: 'Welfare', ItemId: item.Id};
          this.apiCall.sendData('create/ask', putData,  true).subscribe(
              data => {
                if (data.status){
                  console.log(data);
                  this.presentToast('Request Successfully submitted');
                }else{
                  this.presentToast('There was a problem submitting your request');
                  console.log(data);
                }
              }
          );
        }
    );
  }

  ngOnInit(){
    this.getItems();
  }

}
