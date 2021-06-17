import {Component, Input, OnInit} from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  noteForm: FormGroup;
  submitAttempt = false;
  postData;
  @Input() item: any;

  constructor(private toastCtrl: ToastController, private sqlite: SQLite,
              private modalCtrl: ModalController, public formBuilder: FormBuilder) { }

  dbSave() {
    this.submitAttempt = true;

    if (!this.noteForm.valid) {
      console.log('INVALID SCHEDULE FORM!');
      console.log(this.noteForm.value);
    } else {
      console.log('success!');
      console.log(this.noteForm.value);
      this.postData = this.noteForm.value;
      this.sqlite.create({
        name: 'ppforum.db',
        location: 'default'
      })
          .then((db: SQLiteObject) => {
            if (this.postData.id > 0) {
              db.executeSql('UPDATE notes SET topic =?, content=?, time=?, date=?, venue=? WHERE id = ?',
                  [this.postData.topic, this.postData.content, this.postData.time,
                    this.postData.date, this.postData.venue, this.postData.id])
                  .then(() => {
                    this.presentToast('Note Successfully saved').then(() => {
                      this.dismiss();
                    });
                  })
                  .catch(e => console.log(e));
            } else {
              db.executeSql('INSERT INTO notes (date, topic, content, venue, time) VALUES (?,?,?,?,?)',
                  [this.postData.date, this.postData.topic, this.postData.content, this.postData.venue, this.postData.time])
                  .then(() => {
                    this.presentToast('Note Successfully saved').then(() => {
                      this.dismiss();
                    });

                  })
                  .catch(e => console.log(e));
            }
          })
          .catch(e => {
                console.log(e);
              }
          );
    }
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
    await toast.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
      item: this.postData
    });
  }

  ngOnInit() {
      this.item = (this.item == null) ? {id: 0, topic: '', content: '', date: '', time: '', venue: ''} : this.item;
      console.log(this.item);
      this.noteForm = this.formBuilder.group({
          topic: new FormControl(this.item.topic, Validators.compose([Validators.maxLength(30),
              Validators.required])),
          content: new FormControl(this.item.content, Validators.compose([Validators.required])),
          time: new FormControl(this.item.time, Validators.compose([Validators.required])),
          venue: new FormControl(this.item.venue, Validators.compose([Validators.maxLength(200)])),
          id: new FormControl(this.item.id, Validators.compose([Validators.maxLength(5)])),
          date: new FormControl(this.item.date, Validators.compose([Validators.required]))
      });
  }
}
