import { Component } from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SQLiteObject, SQLite} from '@ionic-native/sqlite/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  items = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private sqlite: SQLite,
    private push: FCM,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      (localStorage.getItem('LOGGED_IN') === 'true') ? this.router.navigateByUrl('/menu/tabs') : this.router.navigateByUrl('');
      this.initPushNotification();
/*      this.createDbs();*/
      this.statusBar.styleDefault();
    });
  }

  save() {
    const store = this.storage.set('profile', JSON.stringify(this.items));
  }


  addItem(idKey, val) {
    if (this.items.length > 0){
      const obj = this.items.filter((o) => o[idKey])[0];
      // console.log(obj);
      if (typeof obj !== 'undefined'){
        if (obj[idKey] !== val && idKey !== 'Token') { this.items.push({[idKey] : val}); }
      }else{
        this.items.push({[idKey] : val});
      }
    }else{
      this.items.push({[idKey] : val});
    }
    console.log(this.items);
    this.save();
  }

  getToken(){
    this.push.getToken().then(token => {
      this.addItem('Token', token);
      console.log('Device Token: ', token);
    });
  }

  initPushNotification(){
    /* Push Notification Starts*/
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    // to check if we have permission
    this.push.hasPermission()
        .then((res: any) => {
          console.log(res);
          if (res){
            console.log('We have permission for push notifications');
            this.getToken();
          }else{
            console.warn('No Push Permissions');
            this.push.requestPushPermission().then((r) => {
              console.log(r);
              this.getToken();
            });
          }
        });

/*    this.push.getToken().then(token => {
      this.addItem('Token', token);
      console.log('Device Token: ', token);
    });*/
    // refresh the FCM token
    this.push.onTokenRefresh().subscribe(token => {
      this.addItem('Token', token);
      console.log('Device Token Refreshed: ', token);
    });

    // ionic push notification
    this.push.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        const alert = this.presentAlert(data);
      } else {
        const alert = this.presentAlert(data);
      }
    });
    /* Push Notification Ends*/
  }

  async presentAlert(data) {
    const alert = await this.alertCtrl.create({
      header: data.title,
      message: data.body,
      buttons: ['OK']
    });

    await alert.present();
  }

}
