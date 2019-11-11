import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ProfileService } from '../services/api/profile.service';
import { FriendshipService } from '../services/api/friendship.service';
import { Storage } from '@ionic/storage';

const EMAIL = 'email';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  fullname: string;
  email: string;
  avatar: string;
  countRequest = 0;

  loading = this.loadingController.create({
    message: 'Đang xử lý dữ liệu',
  });

  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private profileAPI: ProfileService,
    private friendAPI: FriendshipService,
    private storage: Storage,
    private loadingController: LoadingController
    ) { }

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
    this.loading.then(ob =>{
      ob.present();
    })
    this.profileAPI.getProfile().then(ob => {
      ob.subscribe(async res => {
        this.fullname = await res['data']['full_name']
        this.avatar = res['data']['avatar_url']
        await this.loading.then(ob =>{
          ob.dismiss();
        })
      })
    })
    this.storage.get(EMAIL).then(value => {
      this.email = value
    })

    this.friendAPI.getListRequestsFriend().then(ob => {
      ob.subscribe(res => {
        if(res.data){
          this.countRequest = res.data.length
        }
      })
    })
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

  onAddFriend() {
    this.navCtrl.navigateForward(['add-friend']);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Đang xử lý dữ liệu',
    });
    return loading
  }
}
