import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsSearchPage } from './tabs-search.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'admin-foods',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsSearchPage,
    children:[
        { path: 'admin-foods', loadChildren: '../../search-foods/admin-foods/admin-foods.module#AdminFoodsPageModule' },
        { path: 'user-foods', loadChildren: '../../search-foods/user-foods/user-foods.module#UserFoodsPageModule' },
        { path: 'shop-foods', loadChildren: '../../search-foods/shop-foods/shop-foods.module#ShopFoodsPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsSearchPage]
})
export class TabsSearchPageModule {}
