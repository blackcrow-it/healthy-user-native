import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(private authService: AuthenticationService, public navCtrl: NavController, private alertController: AlertController) { }

  async clickLogout() {
    const alert = await this.alertController.create({
      header: 'Đăng xuất!',
      message: 'Bạn muốn đăng xuất?',
      buttons: [
        {
          text: 'Không',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Đồng ý',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }

  onClickProfile() {
    this.navCtrl.navigateForward(['profile']);
  }

  onClickGoal() {
    this.navCtrl.navigateForward(['goals']);
  }

  onClickRemind() {
    this.navCtrl.navigateForward(['notification']);
  }

  takePhoto() {

  }

  getPhotoGallery() {

  }

}
