import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(private authService: AuthenticationService, public navCtrl: NavController, public actionSheetController: ActionSheetController, public toastController: ToastController) { }

  clickLogout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

  onClickProfile() {
    this.navCtrl.navigateForward(['profile']);
  }

  onClickGoal() {
    this.navCtrl.navigateForward(['goals']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tính năng này đang phát triển.',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ảnh đại diện',
      buttons: [{
        text: 'Máy ảnh',
        icon: 'camera',
        handler: () => {
          this.presentToast();
        }
      }, {
        text: 'Thư viện',
        icon: 'image',
        handler: () => {
          this.presentToast();
        }
      }, {
        text: 'Đóng',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  takePhoto() {

  }

  getPhotoGallery() {

  }

}
