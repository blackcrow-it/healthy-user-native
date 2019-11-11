import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ProfileService } from '../../services/api/profile.service';
import { WeightApi } from '../../services/api/weight.service';
import { NutritionApi } from '../../services/api/nutrition.service';
import { Nutrition } from 'src/app/models/nutrition';
import { Storage } from '@ionic/storage';

const STEP = 'step';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {
  weight = 0;
  height = 0;
  weightFinal: number;

  time: number;

  bmi = 0;
  
  percentLine = 0

  maxWeight = 0;
  minWeight = 0;
  normalWeight = 0;

  activity: string;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public profileApi: ProfileService,
    public weightApi: WeightApi,
    public nutritionApi: NutritionApi,
    private storage: Storage,
    public loadingController: LoadingController
  ) {
    
  }

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

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Đang tải dữ liệu'
    });
    await loading.present();
    await this.targetWeight()
    this.bmi = await Math.round(this.weight/(this.height*this.height) * 10) / 10;
    this.percentLine = await (this.bmi - 14)/0.27
    await loading.present();
  }

  async targetWeight(){
    await this.profileApi.getProfile().then(ob => {
      ob.subscribe(async res => {
        this.height = res.data.height/100
        this.weight = res.data.weight
        this.maxWeight = await this.height * 100 - 100;
        this.minWeight = await Math.round(this.maxWeight * 8 / 10 * 10) / 10;
        this.normalWeight = await Math.round(this.maxWeight * 9 / 10 * 10) / 10;
      })
    })    
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
            var nutrition = new Nutrition();
            nutrition.weight = Math.abs(this.weight - this.weightFinal)
            nutrition.month = this.time
            nutrition.activityLevel = parseInt(this.activity)
            nutrition.type = 1
            this.nutritionApi.createNutrition(nutrition).then(ob => {
              ob.subscribe(res => {
                this.navCtrl.navigateForward(['result']);
                this.storage.set(STEP, 3)
              })
            })
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
