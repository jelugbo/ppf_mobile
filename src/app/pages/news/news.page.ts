import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  itemList;
  showNews;

  constructor(private apiCall: DataService, private router: Router, private infoService: InfoService) { }

    itemTapped(item){
        console.log(item);
        this.infoService.setData(item.Id, item);
        this.router.navigateByUrl('/menu/newsitem/' + item.Id);
    }

    getNews(){
        const a = new Date();
        const e = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
        // const e = '2020-09-17';
        console.log(e);
        this.apiCall.fetchData('pluck/news/News' , '', false).subscribe(
            data => {
                this.showNews = !!(Array.isArray(data.info) && data.info.length > 0);
                console.log(this.showNews);
                this.itemList = data.info;
                console.log( this.itemList);
            },
            err => console.error(err),
            () => console.log('Fetch News Completed')
        );

    }

  ngOnInit() {
    this.getNews();
  }

}
