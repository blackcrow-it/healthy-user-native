import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {
  weight = 56;
  height = 1.63;
  weightFinal = null;

  bmi = Math.round(this.weight/(this.height*this.height) * 10) / 10;
  
  percentLine = (this.bmi - 14)/0.27

  maxWeight = this.height * 100 - 100;
  minWeight = Math.round(this.maxWeight * 8 / 10 * 10) / 10;
  normalWeight = Math.round(this.maxWeight * 9 / 10 * 10) / 10;

  constructor(public navCtrl: NavController, public alertController: AlertController) { }

  setMyStyles() {
    if (this.bmi <= 14) {
      this.percentLine = 0
    } else if (this.bmi >= 40) {
      this.percentLine = 98
    }
    let styles = {
      'content': '',
      'width': '10px',
      'height': '10px',
      'background-color': '#f04141',
      'border': 'solid 1px #f04141',
      'display': 'block',
      'position': 'absolute',
      'top': '-5px',
      'left': this.percentLine.toString() + '%',
      'border-radius': '100%',
      'z-index': '1000'
    };
    return styles;
  }

  ngOnInit() {
    console.log(this.bmi)
    if (this.bmi) {
      
    }
    
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Thông báo!',
      message: 'Bạn đã <strong>chắc chắn</strong> "Tiếp tục" chưa?',
      buttons: [
        {
          text: 'Chưa',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Đồng ý',
          handler: () => {
            this.navCtrl.navigateForward(['result']);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  clickResult() {
    this.presentAlertConfirm()
  }

}
