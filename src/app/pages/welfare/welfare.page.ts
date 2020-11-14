import { Component, OnInit } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Storage} from '@ionic/storage';
import {AlertController, ToastController} from '@ionic/angular';
import {InfoService} from '../../services/info.service';

@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.page.html',
  styleUrls: ['./welfare.page.scss'],
})
export class WelfarePage implements OnInit {
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
      this.presentAlert('Welfare', 'Link has not been provided');
    }
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

  ngOnInit() {
    if (this.route.snapshot.data.special) {
      this.item = this.route.snapshot.data.special;
      console.log(this.item);
    }
  }

}
