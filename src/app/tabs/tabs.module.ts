import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { SearchPageModule } from '../search/search.module'

const routes: Routes = [
  {
    path:'',
    redirectTo:'progress',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
        { path: 'menu', loadChildren: '../menu/menu.module#MenuPageModule' },
        { path: 'progress', loadChildren: '../progress/progress.module#ProgressPageModule' },
        { path: 'shop', loadChildren: '../shop/shop.module#ShopPageModule' },
        { path: 'notifications', loadChildren: '../notifications/notifications.module#NotificationsPageModule' },
        { path: 'friend', loadChildren: '../friend/friend.module#FriendPageModule' },
    ]
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
