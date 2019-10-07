import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { SearchPageModule } from '../search/search.module'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: 'tab1', loadChildren: '../tab1/tab1.module#Tab1PageModule' },
        { path: 'menu', loadChildren: '../menu/menu.module#MenuPageModule' },
        { path: 'progress', loadChildren: '../progress/progress.module#ProgressPageModule' },
        { path: 'more', loadChildren: '../more/more.module#MorePageModule' },
        { path: 'shop', loadChildren: '../shop/shop.module#ShopPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/menu',
    pathMatch:'full'
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
