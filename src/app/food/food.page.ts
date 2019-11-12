import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { SearchApi } from '../services/api/search.service';
import { FoodApi } from '../services/api/food.service';
import { FoodMenuApi } from '../services/api/food-menu.service';
import { Storage } from '@ionic/storage';
import { FoodInMeal } from '../models/meal';
import { DataService } from '../services/data.service';


const SELECT_MENU = 'select';
const SELECT_TIME = 'selecttime';
const SELECT_MEAL = 'meal';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;

  private doughnutChart: Chart;

  food = {
    "food_id": 0,
    "description": "",
    "food_name": "",
    "quantity": 0,
    "unit": "",
    "calories": 0,
    "carbs": 0,
    "fat": 0,
    "proteins": 0
  }

  carbs = 0;
  fat = 0;
  protein = 0;
  kcal = 0;
  quantity = 0;

  percentCarbs = 0;
  percentFat = 0;
  percentProtein = 0;
  percentTotal = 0;

  type: string;

  existImage: boolean;

  //Add Loading
  loading = this.loadingController.create({
    message: 'Đang xử lý dữ liệu',
  });
  presentLoading(){
    this.loading.then(ob =>{
      ob.present();
    })
  }
  dismissLoading(){
    this.loading.then(ob =>{
      ob.dismiss();
    })
  }

  constructor(
    public navCtrl: NavController,
    public toastController: ToastController,
    public searchApi: SearchApi,
    private foodApi: FoodApi,
    private menuApi: FoodMenuApi,
    private storage: Storage,
    private navService: DataService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.presentLoading();
    var thisPath = await window.location.href
    var idFood = await thisPath.split("/")[thisPath.split("/").length - 1]
    await this.foodApi.getFood(idFood).then(ob => {
      ob.subscribe(async res => {
        if(res.data.description){
          this.existImage = true;
        } else {
          this.existImage = false;
        }
        this.food = res.data
        this.carbs = await this.food.carbs;
        this.fat = await this.food.fat;
        this.protein = await this.food.proteins;
        this.kcal = await this.food.calories;
        if (this.navService.get('type') == 'edit') {
          this.quantity = await this.navService.get('meal_quantity')
        } else {
          this.quantity = await this.food.quantity;
        }
        this.percentTotal = await 100 / (this.carbs * 4 + this.fat * 9 + this.protein * 4);
        this.percentCarbs = await Math.round((this.carbs * 4) * this.percentTotal * 1) / 1;
        this.percentFat = await Math.round((this.fat * 9) * this.percentTotal * 1) / 1;
        this.percentProtein = await Math.round((this.protein * 4) * this.percentTotal * 1) / 1;

        this.navService.get('meal_quantity')

        this.dismissLoading();
      })
    })
  }

  onChangeQuantity(event: any) {
    this.carbs = Math.round((this.food.carbs * event.target.value / this.food.quantity) * 10) / 10;
    this.fat = Math.round((this.food.fat * event.target.value / this.food.quantity) * 10) / 10;
    this.protein = Math.round((this.food.proteins * event.target.value / this.food.quantity) * 10) / 10;
    this.kcal = Math.round((this.food.calories * event.target.value / this.food.quantity) * 1) / 1;

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
    const loading = await this.loadingController.create({
      message: 'Đang xử lý',
    });
    await loading.present();
    if (this.navService.get('type') == 'edit') {
      await this.menuApi.editOneFoodToMenu(this.navService.get('meal_detail_id'), this.quantity).then(ob => {
        ob.subscribe(async res => {
          console.log(res)
          const toast = await this.toastController.create({
            message: `Đã sửa số lượng của ${this.food.food_name}.`,
            duration: 1000
          });
          toast.present();
          await loading.dismiss();
          await this.navCtrl.navigateBack(['tabs/menu'])
        })
      })
    } else {
      var meal;
      await this.storage.get(SELECT_MEAL).then(res => {
        meal = res
      })

      await this.storage.get(SELECT_TIME).then(async res => {
        if (meal == "break_fast") {
          meal = "breakfast"
        }
        await this.menuApi.addOneFoodToMenu(res, this.food.food_id, this.quantity, meal).then(ob => {
          ob.subscribe(async res => {
            const toast = await this.toastController.create({
              message: 'Đã thêm thức ăn.',
              duration: 1000
            });
            toast.present();
            await loading.dismiss();
            await this.navCtrl.navigateBack(['tabs/menu'])
          }, async err => {
            await loading.dismiss();
            const toast = await this.toastController.create({
              message: 'Thức ăn chưa được thêm.',
              duration: 1000
            });
            toast.present();
          })
        })
      })
    }
  }

  IsImageOk(img) {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if (!img.complete) {
        return false;
    }

    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.
    if (img.naturalWidth === 0) {
        return false;
    }

    // No other way of checking: assume it’s ok.
    return true;
}

  requestOk(url: string) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
    console.log(req.status)
    if (req.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
