import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CallApiService } from 'src/app/services/callapi.service';
import { Profile } from '../../models/profile';
import * as uuid from 'uuid';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  weight = 56;
  height = 1.69;

  validPhone = false;

  gender = "male";
  birthday = "";
  fullname = "Nguyen Quang Hung";
  phone = "0866531360";

  inputFullname = document.getElementById('fullname')

  today = new Date();
  minYear = this.formatDate(new Date(this.today.getFullYear() - 90, this.today.getMonth(), this.today.getDate()));
  maxYear = this.formatDate(new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate()));

  formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return year + '-' + (monthIndex + 1) + '-' + day;
  }

  constructor(public navCtrl: NavController, public toastController: ToastController, private _callApiService: CallApiService,) { }

  ngOnInit() {
  }

  validatePhone(number) {
    var re = /((9|3|7|8|5|849|843|847|848|845)+([0-9]{8})\b)/g;
    return re.test(number);
  }

  async clickTarget() {

    if (this.validatePhone(this.phone)) {
      this.validPhone = true
    } else {
      this.validPhone = false
    }


    console.log(uuid.v4())
    console.log(typeof(uuid.v4()))

    if (this.fullname && this.birthday && this.phone && this.weight && this.height && this.gender) {
      if (!this.validPhone) {
        const toast = await this.toastController.create({
          message: 'Số điện thoại chưa hợp lệ.',
          duration: 2000,
          buttons: [
            {
              text: 'Đóng',
              role: 'cancel'
            }
          ]
        });
        toast.present();
      } else {
        var profile = new Profile();
        profile.avatar_url = "https://api.adorable.io/avatars/285/"+ uuid.v4() +".png";
        profile.date_of_birth = Math.round(new Date(this.birthday).getTime()/1000);
        profile.full_name = this.fullname;
        profile.gender = this.gender;
        profile.height = this.height*100;
        profile.weight = this.weight;
        profile.phone = this.phone;

        this._callApiService.createProfile(profile).subscribe(res => {
          console.log(res);
        }, error => {
          console.log(error)
        })
        // this.navCtrl.navigateForward(['target']);
        console.log("success")
      }
    } else {
      console.log("fail")
      const toast = await this.toastController.create({
        message: 'Hãy điền đủ thông tin.',
        duration: 2000,
        buttons: [
          {
            text: 'Đóng',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
  }

}
