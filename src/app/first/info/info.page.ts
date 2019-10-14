import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  weight = null;
  height = null;

  validPhone = false;

  gender = "";
  birthday = "";
  fullname = "";
  email = "";
  phone = "";

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

  constructor(public navCtrl: NavController, public toastController: ToastController) { }

  ngOnInit() {
  }

  // validateEmail(email) {
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // }

  validatePhone(number) {
    var re = /((9|3|7|8|5|849|843|847|848|845)+([0-9]{8})\b)/g;
    return re.test(number);
  }

  async clickTarget() {
    // if (this.validateEmail(this.email)) {
    //   this.validEmail = true
    // } else {
    //   this.validEmail = false
    // }

    if (this.validatePhone(this.phone)) {
      this.validPhone = true
    } else {
      this.validPhone = false
    }
    this.navCtrl.navigateForward(['target']);


    console.log(this.phone)

    if (this.fullname && this.birthday && this.email && this.phone && this.weight && this.height) {
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
        this.navCtrl.navigateForward(['target']);
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
