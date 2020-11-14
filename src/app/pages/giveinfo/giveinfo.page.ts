import { Component, OnInit } from '@angular/core';
import {SocialSharing} from "@ionic-native/social-sharing/ngx";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Storage} from "@ionic/storage";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-giveinfo',
  templateUrl: './giveinfo.page.html',
  styleUrls: ['./giveinfo.page.scss'],
})
export class GiveinfoPage implements OnInit {

  public item: any;
  constructor(private socialSharing: SocialSharing, private route: ActivatedRoute, private apiCall: DataService,
              private storage: Storage, private toastController: ToastController) { }

  shareUs(item) {
    console.log(item);
    const options = {
      message: 'Giveaway: \n' + item.Title, // not supported on some apps (Facebook, Instagram)
      subject: item.Title, // fi. for email
      files: [item.Images], // an array of filenames either locally or remotely
      url: 'https://www.rccgnappf.org.org',
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

  requestor(item){
    this.storage.get('USER_ID').then(
        (id) => {
          const putData = {RequestorId: id, Type: 'Giveaway', ItemId: item.Id};
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


  requestors(item){
    this.storage.get('USER_ID').then(
        (id) => {
          this.apiCall.fetchData('pluck/user/' + id, '' , false).subscribe(
              user => {
                if (user.status){
                  const putData = {RequestorName: user.info.FirstName + user.info.LastName, RequestorParish: user.info.Parish,
                    GiveawayId: item.Id};
                  this.apiCall.sendData('create/requestor', putData,  true).subscribe(
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
