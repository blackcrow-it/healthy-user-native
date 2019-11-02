import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { FoodApi } from 'src/app/services/api/food.service';
import { ToastController } from '@ionic/angular';

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
  unit = "g"

  constructor(private foodApi: FoodApi, public toastController: ToastController) { }

  ngOnInit() {
  }

  createFood(){
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
        const toast = await this.toastController.create({
          message: `Thêm ${this.food_name} thành công.`,
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
      }, async err => {
        const toast = await this.toastController.create({
          message: `Thêm ${this.food_name} thất bại. Vui lòng xem lại.`,
          duration: 2000
        });
        toast.present();
      })
    })
  }
}
