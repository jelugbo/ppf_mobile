import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {DataService} from '../../services/data.service';
import {UploadPage} from '../upload/upload.page';
import {Storage} from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {InfoService} from '../../services/info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-giveaway',
  templateUrl: './giveaway.page.html',
  styleUrls: ['./giveaway.page.scss'],
})
export class GiveawayPage implements OnInit {
  showItems;
  itemList;

  constructor(private modalCtrl: ModalController, private apiCall: DataService, private infoService: InfoService,
              private socialSharing: SocialSharing, private toastControllar: ToastController,
              private storage: Storage, private router: Router) { }

  getItems(){
    this.apiCall.fetchData('pluck/giveaway' , '', false).subscribe(
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

  async addNew(){
    const pageModal = await this.modalCtrl.create({
      component: UploadPage
    });

    await pageModal.present();
    const { data } = await pageModal.onDidDismiss();
    this.getItems();
    console.log(data);
  }

    itemTapped(item){
        console.log(item);
        this.infoService.setData(item.Id, item);
        this.router.navigateByUrl('/menu/giveinfo/' + item.Id);
    }
  ngOnInit(){
    this.getItems();
  }

}
