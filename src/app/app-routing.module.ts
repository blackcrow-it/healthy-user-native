import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'info', loadChildren: './first/info/info.module#InfoPageModule' },
  { path: 'target', loadChildren: './first/target/target.module#TargetPageModule' },
  { path: 'result', loadChildren: './first/result/result.module#ResultPageModule' },
  { 
    path: 'tabs',
    canActivate: [AuthGuardService],
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { 
    path: 'food/:id', 
    canActivate: [AuthGuardService],
    loadChildren: './food/food.module#FoodPageModule' 
  },
  { path: 'more', loadChildren: './more/more.module#MorePageModule' },
  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
  // { path: 'progress', loadChildren: './progress/progress.module#ProgressPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
