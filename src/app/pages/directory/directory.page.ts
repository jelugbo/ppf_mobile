import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {InfoService} from '../../services/info.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
    selector: 'app-directory',
    templateUrl: './directory.page.html',
    styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
    public directoryList;
    public dates;
    public showDirectory = true;
    term = '';

    constructor(private navCtrl: Router, private apiCall: DataService, private infoService: InfoService) {
    }

    getItems() {
        this.apiCall.fetchData('pluck/user', 'RoleId=3', false).subscribe(
            data => {
                this.showDirectory = !!(Array.isArray(data.info) && data.info.length > 0);
                console.log(this.showDirectory);
                this.directoryList = data.info;
                console.log(data.info);
            },
            err => console.error(err),
            () => console.log('Fetch Directory List Completed')
        );

    }

    getImage(url) {
        const a = document.createElement('a');
        a.href = url;
        console.log(url, a.host);
        return this.isURL(url) ? url : 'assets/img/rccg_logo.png';
    }

    isURL(str){
        try {
            const a = new URL(str);
        } catch (_) {
            return false;
        }
        return true;
    }

    itemTapped(item) {
        this.infoService.setData(item.Id, item);
        this.navCtrl.navigateByUrl('/menu/person/' + item.Id);
    }

    ngOnInit() {
        this.directoryList = this.getItems();
        console.log(this.directoryList);
    }

}
