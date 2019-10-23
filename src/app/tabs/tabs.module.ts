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
    redirectTo:'menu',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
        { path: 'menu', loadChildren: '../menu/menu.module#MenuPageModule' },
        { path: 'progress', loadChildren: '../progress/progress.module#ProgressPageModule' },
        { path: 'more', loadChildren: '../more/more.module#MorePageModule' },
        { path: 'shop', loadChildren: '../shop/shop.module#ShopPageModule' },
        { path: 'excercise', loadChildren: '../excercise/excercise.module#ExcercisePageModule' },
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
