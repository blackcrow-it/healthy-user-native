import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/api/profile.service'
import { Profile } from '../../models/profile'
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data = {};

  birthday = ""

  constructor(private profileApi: ProfileService, public actionSheetController: ActionSheetController, public toastController: ToastController) { }

  ngOnInit() {
    this.profileApi.getProfile().then(ob => {
      ob.subscribe(res => {
        this.data = res.data
        this.birthday = this.formatDate(new Date(this.data['date_of_birth']))
      }, error => {
        console.log(error)
      })
    })
  }

  today = new Date();
  minYear = this.formatDate(new Date(this.today.getFullYear() - 90, this.today.getMonth(), this.today.getDate()));
  maxYear = this.formatDate(new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate()));

  formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + '-' + (monthIndex + 1) + '-' + day;
  }

  convertStringToTime(timeString: string) {
    var timeArray = timeString.split('-');
    return new Date(parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2])).getTime()
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

  saveProfile() {
    var profile = new Profile();
    profile.avatar_url = this.data['avatar_url']
    profile.date_of_birth = this.convertStringToTime(this.birthday)
    profile.full_name = this.data['full_name']
    profile.gender = this.data['gender']
    profile.height = this.data['height']
    profile.phone = this.data['phone']
    profile.weight = this.data['weight']
    this.profileApi.createProfile(profile).then(ob => {
      ob.subscribe(async () => {
        const toast = await this.toastController.create({
          message: 'Cập nhật thông tin thành công.',
          duration: 2000
        });
        toast.present();
      })
    })
    console.log(this.data)
  }
}
