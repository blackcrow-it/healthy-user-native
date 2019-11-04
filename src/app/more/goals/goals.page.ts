import { Component, OnInit } from '@angular/core';
import { NutritionApi } from '../../services/api/nutrition.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  info = {
    weightStart: "55",
    dateStart: "09-10-2019",
    weight: "55",
    goal: "60",
    timeGoal: "2",
    typeTimeGoal: "month",
    activity: 3
  }

  constructor(private nutritionAPI: NutritionApi) { }

  ngOnInit() {
    this.nutritionAPI.getNutrition().then(ob => {
      ob.subscribe(res => {
        if (res) {
          this.info.weightStart = res.weightStart
          this.info.timeGoal = res.month
          this.info.activity = res.activityLevel
        }
        console.log(res)
      })
    })
  }

}
