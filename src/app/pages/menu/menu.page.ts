import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
public pages = [
  {
    title: 'Home',
    url: '/menu/tabs',
    icon: 'home'
  },
/*  {
    title: 'Scheduler',
    url: '/menu/tabs/tabs/scheduler',
    icon: 'calendar'
  },
  {
    title: 'Directory',
    url: '/menu/tabs/tabs/directory',
    icon: 'file-tray-full'
  },
  {
    title: 'Settings',
    url: '/menu/tabs/tabs/settings',
    icon: 'settings'
  },*/
  {
  title: 'Training',
    url: '/menu/training',
    icon: 'school'
  },
/*  {
    title: 'Technology',
    url: '/menu/technology',
    icon: 'globe'
  },*/
  {
    title: 'Information',
    url: '/menu/information',
    icon: 'information-circle'
  },
  {
    title: 'Asset Give Away',
    url: '/menu/giveaway',
    icon: 'heart-circle'
  },
/*  {
    title: 'Celebration/Events',
    url: '/menu/events',
    icon: 'calendar'
  },*/
  {
    title: 'Meetings',
    url: '/menu/meetings',
    icon: 'people-circle'
  },
  {
    title: 'Fund Raising',
    url: '/menu/funds',
    icon: 'wallet'
  },
/*  {
    title: 'Privacy Policy',
    url: '/menu/privacy',
    icon: 'document-text'
  },*/
  {
    title: 'Notification',
    url: '/menu/notifications',
    icon: 'notifications'
  },
  {
    title: 'News',
    url: '/menu/news',
    icon: 'newspaper'
  },
  {
  title: 'Helpdesk',
  url: '/menu/helpdesks',
  icon: 'help-circle'
},
  {
    title: 'Welfare',
    url: '/menu/welfares',
    icon: 'heart'
  },
  {
    title: 'Livestream',
    url: '/menu/live',
    icon: 'videocam'
  }
];
selectedPath = '';
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;

      }
    });
  }

  ngOnInit() {
  }

}
