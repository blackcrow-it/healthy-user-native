import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  progressText = "g";
  progressCalo = "cal";
  progress = 0;

  titleCarbs = "";
  titleFat = "";
  titleProtein = "";
  titleCalo = "";

  perCarbs = 0;
  perFat = 0;
  perProtein = 0;
  perCalo = 0;

  today = new Date();
  tomorrow = new Date();
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

  isLoaded = false;

  foods = [
    {
      "data": [
        {
          "id": "a",
          "name": "Trứng",
          "quantity": 7,
          "unit": "quả to",
          "kcal": 72,
          "carbs": 0.4,
          "fat": 4.8,
          "protein": 6.3
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 10,
          "unit": "gram",
          "kcal": 2,
          "carbs": 0,
          "fat": 0.2,
          "protein": 0.2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 7,
          "unit": "quả vừa",
          "kcal": 63,
          "carbs": 0.3,
          "fat": 4.2,
          "protein": 5.5
        }
      ],
      "title": "Bữa sáng"
    },
    {
      "data": [
        {
          "id": "a",
          "name": "Trứng",
          "quantity": 1,
          "unit": "quả to",
          "kcal": 72,
          "carbs": 0.4,
          "fat": 4.8,
          "protein": 6.3
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 5,
          "unit": "gram",
          "kcal": 2,
          "carbs": 0,
          "fat": 0.2,
          "protein": 0.2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 3,
          "unit": "quả vừa",
          "kcal": 63,
          "carbs": 0.3,
          "fat": 4.2,
          "protein": 5.5
        }
      ],
      "title": "Bữa trưa"
    },
    {
      "data": [
        {
          "id": "a",
          "name": "Trứng",
          "quantity": 2,
          "unit": "quả to",
          "kcal": 72,
          "carbs": 0.4,
          "fat": 4.8,
          "protein": 6.3
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 1,
          "unit": "gram",
          "kcal": 2,
          "carbs": 0,
          "fat": 0.2,
          "protein": 0.2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 4,
          "unit": "quả vừa",
          "kcal": 63,
          "carbs": 0.3,
          "fat": 4.2,
          "protein": 5.5
        }
      ],
      "title": "Bữa tối"
    },
    {
      "data": [
        {
          "id": "a",
          "name": "Trứng",
          "quantity": 6,
          "unit": "quả to",
          "kcal": 72,
          "carbs": 0.4,
          "fat": 4.8,
          "protein": 6.3
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 9,
          "unit": "gram",
          "kcal": 2,
          "carbs": 0,
          "fat": 0.2,
          "protein": 0.2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 7,
          "unit": "quả vừa",
          "kcal": 63,
          "carbs": 0.3,
          "fat": 4.2,
          "protein": 5.5
        }
      ],
      "title": "Bữa phụ"
    }
  ]

  target = {
    "carbs": 60,
    "fat": 200,
    "protein": 300,
    "calo": 3000
  }

  sum_cal(data) {
    let sum = 0;
    data.forEach(element => {
      let value = element['quantity'] * element['kcal']
      sum += value
    });
    return sum
  }

  total() {
    let total_cal = 0;
    let total_carbs = 0;
    let total_fat = 0;
    let total_protein = 0;
    this.foods.forEach(food => {
      food['data'].forEach(element => {
        let cal = element['quantity'] * element['kcal']
        total_cal += cal
        let carbs = element['quantity'] * element['carbs']
        total_carbs += carbs
        let fat = element['quantity'] * element['fat']
        total_fat += fat
        let protein = element['quantity'] * element['protein']
        total_protein += protein
      });
    });

    this.titleCalo = (Math.round(total_cal * 100) / 100).toString()
    this.perCalo = (total_cal / this.target['calo']) * 100

    this.titleCarbs = (Math.round(total_carbs * 100) / 100).toString()
    this.perCarbs = (total_carbs / this.target['carbs']) * 100

    this.titleFat = (Math.round(total_fat * 100) / 100).toString()
    this.perFat = (total_fat / this.target['fat']) * 100

    this.titleProtein = (Math.round(total_protein * 100) / 100).toString()
    this.perProtein = (total_protein / this.target['protein']) * 100
  }

  constructor(public navCtrl: NavController) { }

  async ngOnInit() {
    this.total()
    await this.sleep(2000);
    this.isLoaded = true;
  }

  public clickFood(food_id) {
    this.navCtrl.navigateForward(['food/' + food_id]);
  }

  public addFoods() {
    this.navCtrl.navigateForward(['tabs-search']);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async changeDate() {
    this.isLoaded = false;
    await this.sleep(1000);
    this.isLoaded = true;
  } 

  async preDay() {
    this.today.setDate(this.today.getDate()-1);
    this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    this.isLoaded = false;
    await this.sleep(1000);
    this.isLoaded = true;
  }

  async nextDay() {
    this.today.setDate(this.today.getDate()+1);
    this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    this.isLoaded = false;
    await this.sleep(1000);
    this.isLoaded = true;
  }
}
