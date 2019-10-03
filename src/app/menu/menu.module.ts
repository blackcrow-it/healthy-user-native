import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
      titleFontSize: "50",
      subtitleFontSize: "40",
      unitsFontSize: "0",
      backgroundStrokeWidth: 0,
      backgroundPadding: 7,
      space: -8,
      toFixed: 0,
      outerStrokeWidth: 10,
      outerStrokeColor: '#808080',
      innerStrokeWidth: 6,
      innerStrokeColor: '#e7e8ea',
      animationDuration: 500,
      animation: true,
      startFromZero: false,
      responsive: true,
      showUnits: true,
      showTitle: true,
      showSubtitle: false,
      showImage: false,
      renderOnClick: false,
      clockwise: false
    })
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
