import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player/ngx';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-live',
    templateUrl: './live.page.html',
    styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {
    channelId = 'UCHp4qCAPmz7-5BJ601FDFnA';
    maxResult = '20';
    googleToken = 'AIzaSyCt1EtA7LZBDNldAeh8ABvSo107dXfymKY';
    pageToken: string;
    noResults = false;
    posts = [];
    loader: any;

    constructor(public loading: LoadingController, public http: HttpClient, private yt: YoutubeVideoPlayer,
                private router: Router, private apiCall: DataService) {
    }

    async presentLoading() {
        const loading = await this.loading.create({
            cssClass: 'my-custom-class',
            message: 'PRetrieving videos ...',
            duration: 2000
        });
        await loading.present();

        const {role, data} = await loading.onDidDismiss();
        console.log('Loading dismissed!');
        console.log(role, data);
    }

    fetchData() {
        let params = 'part=id,snippet&type=video&order=date&channelId=' + this.channelId +
            '&key=' + this.googleToken + '&maxResults=' + this.maxResult;
        if (this.pageToken) { params += '&pageToken' + this.pageToken; }
        this.apiCall.fetchData('https://www.googleapis.com/youtube/v3/search', params, false).subscribe(
          data => {
            console.log(data.items);
            this.posts = this.posts.concat(data.items);
          },
          err => {console.error(err); this.noResults = true; },
          () => console.log('Fetch Video Play  List Completed')
      );
    }

    playVideo(post) {
        console.log(post.id);
        this.yt.openVideo(post.id.videoId);
    }

    ngOnInit() {
        this.presentLoading().then(() => {
            this.fetchData();
        });
    }

}
