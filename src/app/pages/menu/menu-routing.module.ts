import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoResolverService } from '../../services/info-resolver.service';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'information',
        loadChildren: () => import('../information/information.module').then( m => m.InformationPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'scheduler',
        loadChildren: () => import('../scheduler/scheduler.module').then( m => m.SchedulerPageModule)
      },
      {
        path: 'giveaway',
        loadChildren: () => import('../giveaway/giveaway.module').then( m => m.GiveawayPageModule)
      },
      {
        path: 'funds',
        loadChildren: () => import('../funds/funds.module').then( m => m.FundsPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'directory',
        loadChildren: () => import('../directory/directory.module').then( m => m.DirectoryPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'training',
        loadChildren: () => import('../training/training.module').then( m => m.TrainingPageModule)
      },
      {
        path: 'technology',
        loadChildren: () => import('../technology/technology.module').then( m => m.TechnologyPageModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('../privacy/privacy.module').then( m => m.PrivacyPageModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)
      },
      {
        path: 'popover',
        loadChildren: () => import('../popover/popover.module').then( m => m.PopoverPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'meetings',
        loadChildren: () => import('../meetings/meetings.module').then( m => m.MeetingsPageModule)
      },
      {
        path: 'schedule-item',
        loadChildren: () => import('../schedule-item/schedule-item.module').then( m => m.ScheduleItemPageModule)
      },
      {
        path: 'event',
        loadChildren: () => import('../person/person.module').then( m => m.PersonPageModule)
      },
      {
        path: 'person',
        loadChildren: () => import('../event/event.module').then( m => m.EventPageModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('../schedule/schedule.module').then( m => m.SchedulePageModule)
      },
      {
        path: 'newsitem',
        loadChildren: () => import('../newsitem/newsitem.module').then( m => m.NewsitemPageModule)
      },
      {
        path: 'embed',
        loadChildren: () => import('../embed/embed.module').then( m => m.EmbedPageModule)
      },
      {
        path: 'welfares',
        loadChildren: () => import('../welfares/welfares.module').then( m => m.WelfaresPageModule)
      },
      {
        path: 'helpdesks',
        loadChildren: () => import('../helpdesks/helpdesks.module').then( m => m.HelpdesksPageModule)
      },
      {
        path: 'socials',
        loadChildren: () => import('../socials/socials.module').then( m => m.SocialsPageModule)
      },
      {
        path: 'live',
        loadChildren: () => import('../live/live.module').then( m => m.LivePageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'fundinfo/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../fundinfo/fundinfo.module').then( m => m.FundinfoPageModule)
      },
      {
        path: 'giveinfo/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../giveinfo/giveinfo.module').then( m => m.GiveinfoPageModule)
      },
      {
        path: 'event/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../event/event.module').then( m => m.EventPageModule)
      },
      {
        path: 'person/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../person/person.module').then( m => m.PersonPageModule)
      },
      {
        path: 'schedule/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../schedule/schedule.module').then( m => m.SchedulePageModule)
      },
      {
        path: 'helpdesk/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../helpdesk/helpdesk.module').then( m => m.HelpdeskPageModule)
      },
      {
        path: 'embed/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../embed/embed.module').then( m => m.EmbedPageModule)
      },
      {
        path: 'welfare/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../welfare/welfare.module').then( m => m.WelfarePageModule)
      },
      {
        path: 'newsitem/:id',
        resolve: {
          special: InfoResolverService
        },
        loadChildren: () => import('../newsitem/newsitem.module').then( m => m.NewsitemPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
