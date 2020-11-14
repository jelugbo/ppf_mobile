import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ModalController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {DataService} from '../../services/data.service';



@Component({
  selector: 'app-fundmodal',
  templateUrl: './fundmodal.page.html',
  styleUrls: ['./fundmodal.page.scss'],
})
export class FundmodalPage implements OnInit {
  fundsForm: FormGroup;
  submitAttempt = false;
  postData;
  @Input() item; // : { Id: number, Title: string; Description: string; Images: string};

  constructor(private toastController: ToastController, private storage: Storage, private plt: Platform,
              private modalCtrl: ModalController, private apiCall: DataService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
 /*   this.plt.ready().then(() => {*/
    console.log('in init');
    this.item = (this.item == null) ? {Id: 0, Title: '', Description: '', Link: '#', Type: 'Funds', ExpiryDate: ''} : this.item;
    console.log(this.item);
    this.fundsForm = this.formBuilder.group({
      Title: new FormControl(this.item.Title, Validators.compose([Validators.maxLength(30), Validators.required])),
      Description: new FormControl(this.item.Description, Validators.compose([Validators.required])),
      Link: new FormControl(this.item.Link, Validators.compose([Validators.maxLength(50)])),
      Type: new FormControl(this.item.Type, Validators.compose([Validators.maxLength(5)])),
      ExpiryDate: new FormControl(this.item.ExpiryDate, Validators.compose([Validators.required])),
      Id: new FormControl(this.item.Id, Validators.compose([Validators.maxLength(5)]))
    });

    /*});*/
  }

  IonViewDidLeave(){
    console.log('leaving');
  }

  dbSave() {
    this.submitAttempt = true;
    if (!this.fundsForm.valid) {
      console.log('INVALID GIVE AWAY FORM!');
      console.log(this.fundsForm.value);
    } else {
      console.log('success!');
      console.log(this.fundsForm.value);
      this.postData = this.fundsForm.value;
      this.postData.Type = 'Fund';
      this.storage.get('USER_PASS').then(user => {
      this.postData.PosterId = user.Id;
      this.postData.Parish = user.Parish;
      this.postData.Pastor = user.FirstName + ' ' + user.LastName;
      delete this.postData.Id;
      console.log(this.postData);
      this.apiCall.sendData('create/funds' , this.postData, true).subscribe(
          data => {
            console.log(data);
            const msg = (data.status) ? 'Fund raising item successfully submitted' : 'There was a problem with your submission';
            if (data.status) { this.postData = data.info; }
            this.presentToast(msg).then(() => {
              this.dismiss();
            });
          },
          err => this.presentToast('There was an error with your Fund raising submission: ' + err),
          () => console.log('Fund Raising item submission Completed')
      );

    });
    }
  }

  dismiss() {
    console.log('in dismiss');
    this.storage.remove('STORAGE_KEY');
    this.modalCtrl.dismiss({
      dismissed: true,
      item: this.postData
    });
  }


  async presentToast(text) {
    console.log('in presentToast');
    const toast = await this.toastController.create({
      message: text,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

}
