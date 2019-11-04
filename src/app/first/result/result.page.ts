import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NutritionApi } from '../../services/api/nutrition.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  calories: number;
  carbon: number;
  fat: number;
  month: number;
  proteins: number;
  weight: number;
  type: number;

  constructor(public navCtrl: NavController, private nutritionAPI: NutritionApi) { }

  ngOnInit() {
    this.nutritionAPI.getNutrition().then(ob => {
      ob.subscribe(res => {
        this.calories = Math.round(res.calories * 10)/10 ;
        this.carbon = Math.round(res.carbon * 10)/10;
        this.fat = Math.round(res.fat * 10)/10;
        this.month = res.month;
        this.proteins = Math.round(res.proteins * 10)/10;
        this.weight = Math.round(res.weight * 10)/10;
        this.type = res.type;
      })
    })
  }

  clickSuccess() {
    this.navCtrl.navigateForward(['tabs']);
  }
}
