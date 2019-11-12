import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { FoodApi } from 'src/app/services/api/food.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-foods',
  templateUrl: './user-foods.page.html',
  styleUrls: ['./user-foods.page.scss'],
})
export class UserFoodsPage implements OnInit {
  calories: number
  carbs: number
  description: string
  fat: number
  food_name: string
  proteins: number
  quantity: number
  unit: string

  //Add Loading
  loading = this.loadingController.create({
    message: 'Đang xử lý dữ liệu',
  });
  presentLoading() {
    this.loading.then(ob => {
      ob.present();
    })
  }
  dismissLoading() {
    this.loading.then(ob => {
      ob.dismiss();
    })
  }

  constructor(
    private foodApi: FoodApi,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async createFood() {
    var loading = await this.loadingController.create({
      message: 'Đang xử lý dữ liệu',
    });
    if (
      this.carbs == null ||
      this.fat == null ||
      this.food_name == null ||
      this.proteins == null ||
      this.quantity == null ||
      this.unit == null ||
      this.calories == null) {
        console.log(this.unit)
      const toast = await this.toastController.create({
        message: `Vui lòng điền đầy đủ thông tin món ăn`,
        duration: 2000
      });
      toast.present();
    } else {
      loading.present();
      var food = new Food();
      food.calories = this.calories
      food.carbs = this.carbs
      food.description = this.description
      food.fat = this.fat
      food.food_name = this.food_name
      food.proteins = this.proteins
      food.quantity = this.quantity
      food.unit = this.unit
      this.foodApi.createFood(food).then(ob => {
        ob.subscribe(async res => {
          loading.dismiss();
          const toast = await this.toastController.create({
            message: `Thêm '${this.food_name}' thành công.`,
            duration: 2000
          });
          toast.present();
          this.carbs = null;
          this.description = null;
          this.fat = null;
          this.food_name = null;
          this.proteins = null;
          this.quantity = null;
          this.unit = null;
          this.calories = null;
        }, async () => {
          loading.dismiss();
          const toast = await this.toastController.create({
            message: `Thêm ${this.food_name} thất bại. Vui lòng xem lại.`,
            duration: 2000
          });
          toast.present();
        })
      })
    }
  }
}
