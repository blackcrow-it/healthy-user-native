import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'info', loadChildren: './first/info/info.module#InfoPageModule' },
  { path: 'target', loadChildren: './first/target/target.module#TargetPageModule' },
  { path: 'result', loadChildren: './first/result/result.module#ResultPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  // { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'food', loadChildren: './food/food.module#FoodPageModule' },
  { path: 'progress', loadChildren: './progress/progress.module#ProgressPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
