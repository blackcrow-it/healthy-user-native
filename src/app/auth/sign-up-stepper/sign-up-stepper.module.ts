import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignUpStepperPage } from './sign-up-stepper.page';

import { MaterialModule } from '../../material.module';

const routes: Routes = [
  {
    path: '',
    component: SignUpStepperPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [SignUpStepperPage]
})
export class SignUpStepperPageModule {}
