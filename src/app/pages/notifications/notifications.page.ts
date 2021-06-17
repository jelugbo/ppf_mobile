import { Component, OnInit } from '@angular/core';
import { DataService} from '../../services/data.service';
import {Storage} from '@ionic/storage';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  itemList;
  profile;
  Role;
  constructor(private storage: Storage, private push: FCM, private apiCall: DataService) { }

  getItems(){
    const env = this;
    this.storage.get('pushSettings')
        .then( (data) => {
          console.log(data);
          env.itemList = JSON.parse(data); // ).filter( x => typeof x === 'object');/
          // env.itemList = this.parseAddKey(JSON.parse(data));
          console.log(env.itemList);
        });
  }

  save() {
    /*this.nativeStorage.setItem('profile', JSON.stringify(this.items));*/
    this.storage.set('profile', JSON.stringify(this.profile));
  }

  addItem(idKey, val) {
    if (this.profile.length > 0){
      const obj = this.profile.filter((o) => o[idKey])[0];
      console.log(obj);
      if (typeof obj !== 'undefined'){
        if (obj[idKey] !== val && idKey !== 'pushSettings') { this.profile.push({[idKey] : val}); }
      }else{
        this.profile.push({[idKey] : val});
      }
    }else{
      this.profile.push({[idKey] : val});
    }
    console.log(this.profile);
    this.save();
  }

  getValue(item, t){
    // console.log(item[Object.keys(item)[0]][t]);
    return t === 'Enabled' ? !! + item[Object.keys(item)[0]][t] : item[Object.keys(item)[0]][t];
  }

  onToggleChange(i, s){
    Object.values(this.itemList).forEach((v) => {
      const dKey = Object.keys(v)[0];
      const dVal = v[dKey];
      if (parseInt(dVal.Id, 10) === parseInt(Object.keys(i)[0], 10)) {
        dVal.Enabled = s.checked;
        this.storage.set('pushSettings', JSON.stringify(this.itemList)).then(() => {
          console.log(dVal.GroupName);
          const grp = this.Role + dVal.GroupName.replace(/\s/g, '-');
          console.log(grp);
          console.log(dVal.GroupName);
          (s.checked) ? this.push.subscribeToTopic(grp) : this.push.unsubscribeFromTopic(grp);
        });
      }
    });
  }

  ngOnInit() {
    this.Role = localStorage.getItem('ROLE_ID');
    this.getItems();
  }

}
