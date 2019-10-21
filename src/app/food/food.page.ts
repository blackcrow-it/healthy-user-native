import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;

  private doughnutChart: Chart;

  food = {
    "id": "a",
    "avt": "https://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2019/03/15/931/524/694940094001_6014490250001_6014489408001-vs.jpg?ve=1&tl=1",
    "name": "Trứng",
    "quantity": 1,
    "unit": "quả to",
    "kcal": 72,
    "carbs": 0.4,
    "fat": 4.8,
    "protein": 6.3
  }

  carbs = 0;
  fat = 0;
  protein = 0;
  kcal = 0;

  percentCarbs = 0;
  percentFat = 0;
  percentProtein = 0;
  percentTotal = 0;

  constructor(public navCtrl: NavController, public toastController: ToastController) { }

  ngOnInit() {

    this.carbs = this.food.carbs;
    this.fat = this.food.fat;
    this.protein = this.food.protein;
    this.kcal = this.food.kcal;

    this.percentTotal = 100 / (this.carbs * 4 + this.fat * 9 + this.protein * 4);
    this.percentCarbs = Math.round((this.carbs * 4) * this.percentTotal * 1) / 1;
    this.percentFat = Math.round((this.fat * 9) * this.percentTotal * 1) / 1;
    this.percentProtein = Math.round((this.protein * 4) * this.percentTotal * 1) / 1;
  }

  onChangeQuantity(event: any) {
    this.carbs = Math.round((this.food.carbs * event.target.value) * 1000) / 1000;
    this.fat = Math.round((this.food.fat * event.target.value) * 1000) / 1000;
    this.protein = Math.round((this.food.protein * event.target.value) * 1000) / 1000;
    this.kcal = Math.round((this.food.kcal * event.target.value) * 1000) / 1000;

    if (this.carbs, this.fat, this.protein == 0) {
      this.percentCarbs = 0;
      this.percentFat = 0;
      this.percentProtein = 0;
    } else {
      this.percentTotal = 100 / (this.carbs * 4 + this.fat * 9 + this.protein * 4);
      this.percentCarbs = Math.round((this.carbs * 4) * this.percentTotal * 1) / 1;
      this.percentFat = Math.round((this.fat * 9) * this.percentTotal * 1) / 1;
      this.percentProtein = Math.round((this.protein * 4) * this.percentTotal * 1) / 1;
    }
  }

  async onSaveFood() {
    this.navCtrl.navigateBack(['tabs/menu']);
    const toast = await this.toastController.create({
      message: 'Đã thêm món ăn.',
      duration: 1000
    });
    toast.present();
  }
}
