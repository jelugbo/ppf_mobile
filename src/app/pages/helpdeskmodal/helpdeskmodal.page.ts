import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-helpdeskmodal',
  templateUrl: './helpdeskmodal.page.html',
  styleUrls: ['./helpdeskmodal.page.scss'],
})
export class HelpdeskmodalPage implements OnInit {

  helpForm: FormGroup;
  submitAttempt = false;
  showItem = false;
  Pastors;
  postData;
  @Input() item; // : { Id: number, Title: string; Description: string; Images: string};

  constructor(private toastController: ToastController, private storage: Storage, private plt: Platform,
              private modalCtrl: ModalController, private apiCall: DataService, private formBuilder: FormBuilder) {
    this.getItems();
  }

  onToggleChange(s){
    this.showItem = s.checked;
    console.log(s);
    console.log(this.helpForm.value);
  }

  getName(i){

    return (i.LastName.includes('Committee')) ? i.FirstName + ' ' + i.LastName : 'Pastor ' + i.FirstName + ' ' + i.LastName;

  }

  getItems(){
    const a = new Date();
    const exp =  a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
    this.apiCall.fetchData('pluck/users' , '' + exp, false).subscribe(
        data => {
          // this.showItems = !!(Array.isArray(data.info) && data.info.length > 0);
          // console.log(this.showItems);
          this.Pastors = data.info;
          console.log( this.Pastors);
        },
        err => console.error(err),
        () => console.log('Fetch News Completed')
    );
  }

  ngOnInit() {
    /*   this.plt.ready().then(() => {*/
    console.log('in init');
    this.item = (this.item == null) ? {Id: 0, Title: '', Description: '', ExpiryDate: '', IsPrivate: false,
      RecepientId: 0, Type: 'Help'} : this.item;
    console.log(this.item);
    this.helpForm = this.formBuilder.group({
      Title: new FormControl(this.item.Title, Validators.compose([Validators.maxLength(50), Validators.required])),
      Description: new FormControl(this.item.Description, Validators.compose([Validators.required])),
      ExpiryDate: new FormControl(this.item.ExpiryDate, Validators.compose([Validators.required])),
      IsPrivate: new FormControl(this.item.IsPrivate, Validators.compose([Validators.required])),
      RecipientId: new FormControl(this.item.RecepientId, Validators.compose([Validators.required])),
      Type: new FormControl(this.item.Type, Validators.compose([Validators.maxLength(15)])),
      Id: new FormControl(this.item.Id, Validators.compose([Validators.maxLength(5)]))
    });

    /*});*/
  }

  IonViewDidLeave(){
    console.log('leaving');
  }

  dbSave() {
    this.submitAttempt = true;
    if (!this.helpForm.valid) {
      console.log('INVALID HELP DESK FORM!');
      console.log(this.helpForm.value);
    } else {
      console.log('success!');
      console.log(this.helpForm.value);
      this.postData = this.helpForm.value;
      this.postData.Type = 'Help';
      this.storage.get('USER_PASS').then(user => {
        delete this.postData.Id;
        this.postData.PosterId = user.Id;
        this.postData.Pastor = user.FirstName + ' ' + user.LastName;
        this.postData.Parish = user.Parish;
        console.log(this.postData);
        this.apiCall.sendData('create/funds' , this.postData, true).subscribe(
            data => {
              console.log(data);
              const msg = (data.status) ? 'Helpdesk Request successfully submitted' : 'There was a problem with your submission';
              if (data.status) { this.postData = data.info; }
              this.presentToast(msg).then(() => {
                this.dismiss();
              });
            },
            err => this.presentToast('There was an error with your Helpdesk request submission: ' + err),
            () => console.log('Helpdesk request submission Completed')
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
