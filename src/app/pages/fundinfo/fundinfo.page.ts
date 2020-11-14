import { Component, OnInit } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Storage} from '@ionic/storage';
import {AlertController, ToastController} from '@ionic/angular';
import {InfoService} from '../../services/info.service';

@Component({
  selector: 'app-fundinfo',
  templateUrl: './fundinfo.page.html',
  styleUrls: ['./fundinfo.page.scss'],
})
export class FundinfoPage implements OnInit {

  public item: any;
  constructor(private socialSharing: SocialSharing, private route: ActivatedRoute, private apiCall: DataService,
              private storage: Storage, private toastController: ToastController, private router: Router,
              private alertCtrl: AlertController, private infoService: InfoService) { }

  shareUs(item) {
    console.log(item);
    const options = {
      message: 'Fund Raising: \n' + item.Title, // not supported on some apps (Facebook, Instagram)
      subject: item.Title, // fi. for email
      files: [item.Images], // an array of filenames either locally or remotely
      url: item.Link,
      chooserTitle: 'PP FORUM' // Android only, you can override the default share sheet title
    };
    this.socialSharing.shareWithOptions(options).catch((err) => {
      console.log(err);
    });
  }

  async presentToast(text) {
    console.log('in presentToast');
    const toast = await this.toastController.create({
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
    console.log(a.host);
    if (a.host && a.host !== window.location.host){
      this.infoService.setData(1, url);
      this.router.navigateByUrl('/menu/embed/1');
    }else{
      this.presentAlert('Fund Raising', 'Donation link has not been provided');
    }
  }

  ngOnInit() {
    if (this.route.snapshot.data.special) {
      this.item = this.route.snapshot.data.special;
      console.log(this.item);
    }
  }

}
