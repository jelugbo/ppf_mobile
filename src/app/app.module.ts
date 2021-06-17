import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule} from '@angular/common/http';

import { DataService} from './services/data.service';
import { SharedModule } from './shared.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BrMaskerModule } from 'br-mask';
// import { FCM } from '@ionic-native/fcm/ngx';
import {FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AuthModule } from './auth/auth.module';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'ppforum_db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AppRoutingModule,
    AuthModule,
    HttpClientModule, SharedModule,
    Ionic4DatepickerModule,
    BrMaskerModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
      FCM,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      DataService,
    SocialSharing,
    NativeStorage,
    Calendar,
    SQLite,
    Camera,
    File,
    WebView,
    FilePath,
    YoutubeVideoPlayer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
