import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, IonSelect, IonDatetime, ToastController } from '@ionic/angular';
import { FoodMenuApi } from '../services/api/food-menu.service'
import { NutritionApi } from '../services/api/nutrition.service'
import { WeightApi } from '../services/api/weight.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

const SELECT_MENU = 'select';
const SELECT_TIME = 'selecttime';
const SELECT_MEAL = 'meal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild('optionDashboard', { static: false }) selectRef: IonSelect;
  @ViewChild('datepicker', { static: false }) pickerRef: IonDatetime;
  @ViewChild('datePicker', { static: false }) datePicker;

  optionStatus = "calorie"

  progressText = "g";
  progressCalo = "cal";
  progress = 0;

  titleCarbs = "";
  titleFat = "";
  titleProtein = "";
  titleCalo = "";
  titleExercise = "";

  perCarbs = 0;
  perFat = 0;
  perProtein = 0;
  perCalo = 0;

  today = new Date();
  tomorrow = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();

  menu_id: string;

  isLoaded = false;

  foods = [
    {
      "data": [],
      "title": "Bữa sáng",
      "key": "break_fast"
    },
    {
      "data": [],
      "title": "Bữa trưa",
      "key": "lunch"
    },
    {
      "data": [],
      "title": "Bữa tối",
      "key": "dinner"
    },
    {
      "data": [],
      "title": "Bữa phụ",
      "key": "snacks"
    }
  ]

  target = {
    "carbs": 0,
    "fat": 0,
    "protein": 0,
    "calo": 0
  }

  execise = []

  dateCopy = null;

  activeMeal: string;

  showOption() {
    this.selectRef.open();
  }

  sum_cal(data) {
    let sum = 0;
    data.forEach(element => {
      let value = element['meal_quantity'] / element['quantity'] * element['calories']
      sum += value
    });
    return sum
  }

  constructor(
    public navCtrl: NavController,
    private menuAPI: FoodMenuApi,
    private nutritionAPI: NutritionApi,
    private weightAPI: WeightApi,
    private storage: Storage,
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private navService: DataService,
    public toastController: ToastController
  ) {
    this.activeRoute.params.subscribe(() => {
      this.isLoaded = false;
      this.getDataMenu();
      this.isLoaded = true;
      this.changeDetector.detectChanges();
    })
  }
  async ngOnInit() {
    await this.nutritionAPI.getNutrition().then(ob => {
      ob.subscribe(res => {
        console.log(res)
        this.target.calo = Math.round(res['calories']);
        this.target.carbs = res['carbon'];
        this.target.fat = res['fat'];
        this.target.protein = res['proteins'];
      }, error => {

      })
    })
    await this.getDataMenu();
    this.isLoaded = true;
  }

  async getDataMenu() {
    var day = parseInt(this.date.split('-')[2])
    var month = parseInt(this.date.split('-')[1])
    var year = parseInt(this.date.split('-')[0])
    var dateTimestamp = (new Date(year, month - 1, day)).getTime()
    this.isLoaded = false;

    this.menuAPI.getMenubyDate(dateTimestamp).then(ob => {
      ob.subscribe(res => {
        var data = res['data']
        for (var item in this.foods) {
          var meal = this.foods[item].key
          if (data) {
            try {
              this.foods[item].data = data[meal]['foods']
            }
            catch {
              this.foods[item].data = []
            }
            this.menu_id = data['day_id']
          } else {
            this.foods[item].data = []
            this.menu_id = null
          }
        }
        if (data && data.exercise) {
          this.execise = data['exercise']['exercise_details']
          console.log(data['exercise'])
        } else {
          this.execise = []
        }
        this.total()
        this.isLoaded = true;
      }, error => {
        this.isLoaded = true;
      })
    })
  }

  total() {
    let total_cal = 0;
    let total_carbs = 0;
    let total_fat = 0;
    let total_protein = 0;
    let total_exercise = 0;

    this.foods.forEach(food => {
      food['data'].forEach(element => {
        let cal = element['meal_quantity'] / element['quantity'] * element['calories']
        total_cal += cal
        let carbs = element['meal_quantity'] / element['quantity'] * element['carbs']
        total_carbs += carbs
        let fat = element['meal_quantity'] / element['quantity'] * element['fat']
        total_fat += fat
        let protein = element['meal_quantity'] / element['quantity'] * element['proteins']
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

    this.execise.forEach(element => {
      total_exercise += element.calories_burn
    })
    this.titleExercise = total_exercise.toString()
  }

  public clickFood(food_id, meal_detail_id, meal_quantity) {
    // this.navCtrl.navigateForward(['food/' + food_id]);
    this.navService.push(`/food/${food_id}`, { type: 'edit', meal_detail_id: meal_detail_id, meal_quantity: meal_quantity })
  }

  clickExercise(exercise_id) {
    console.log(this.execise)
    this.navService.push(`/exercise`, { type_exercise: 'edit', exercise_id: exercise_id })
  }

  public addFoods(type: string) {
    var day = parseInt(this.date.split('-')[2])
    var month = parseInt(this.date.split('-')[1])
    var year = parseInt(this.date.split('-')[0])
    var dateTimestamp = (new Date(year, month - 1, day)).getTime()
    this.storage.set(SELECT_MEAL, type)
    this.storage.set(SELECT_MENU, this.menu_id)
    this.storage.set(SELECT_TIME, dateTimestamp)
    this.navCtrl.navigateForward(['tabs-search']);
    this.navService.push('tabs-search', { 'type': type })
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async changeDate() {
    this.getDataMenu();
  }

  async preDay() {
    this.today.setDate(this.today.getDate() - 1);
    this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
    this.getDataMenu();
  }

  async nextDay() {
    this.today.setDate(this.today.getDate() + 1);
    this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
    this.getDataMenu();
  }

  async onCopy(type) {
    var day = parseInt(this.date.split('-')[2])
    var month = parseInt(this.date.split('-')[1])
    var year = parseInt(this.date.split('-')[0])
    // await this.menuAPI.getMenu().then(ob => {
    //   var foodDay = (new Date(year, month - 1, day)).getTime();
    //   ob.subscribe(res => {
    //     console.log(res);
    //   })
    // })
    this.activeMeal = type;
    this.datePicker.open()
  }

  removeFoodInMenu(meal_detail_id, meal) {
    this.menuAPI.removeOneFoodToMenu(meal_detail_id).then(ob => {
      ob.subscribe(res => {
        this.foods.forEach(element => {
          if (element.key == meal) {
            element.data.forEach(food => {
              if (food.meal_detail_id == meal_detail_id) {
                var index = element.data.indexOf(food)
                if (index > -1) {
                  element.data.splice(index, 1);
                }
              }
            });
            this.total();
          }
        });
      })
    })
  }

  removeExerciseInMenu(exercise_detail_id) {
    this.menuAPI.removeOneExerciseToMenu(exercise_detail_id).then(ob => {
      ob.subscribe(res => {
        this.execise.forEach(item => {
          if (item.exercise_detail_id == exercise_detail_id) {
            var index = this.execise.indexOf(item)
            if (index > -1) {
              this.execise.splice(index, 1);
            }
            this.total();
          }
        });
      })
    })
  }

  public customOptions: any = {
    buttons: [
      {
        text: 'Hủy',
        role: 'cancel'
      },
      {
        text: 'Chọn',
        handler: (value) => {
          var time = (new Date(value.year.value, value.month.value - 1, value.day.value)).getTime()
          var day = parseInt(this.date.split('-')[2])
          var month = parseInt(this.date.split('-')[1])
          var year = parseInt(this.date.split('-')[0])
          var dateTimestamp = (new Date(year, month - 1, day)).getTime()
          console.log(value)
          this.menuAPI.getMenubyDate(time).then(ob => {
            ob.subscribe(async res => {
              console.log(res)
              var meal = this.activeMeal;
              if(res.data && res.data[meal]) {
                res.data[meal].foods.forEach(async item => {
                  this.menuAPI.addOneFoodToMenu(dateTimestamp, item.food_id, item.meal_quantity, meal).then(ob => {
                    var detail_meal: string;
                    console.log(meal)
                    ob.subscribe(async res => {
                      if (meal == 'break_fast') {
                        detail_meal = 'bữa sáng';
                      } else if (meal == 'lunch') {
                        detail_meal = 'bữa trưa';
                      } else if (meal == 'dinner') {
                        detail_meal = 'bữa tối';
                      } else {
                        detail_meal = 'bữa phụ';
                      }
                      this.getDataMenu();
                    })
                  })
                  const toast = await this.toastController.create({
                    message: `Đã sao chép vào ${meal} thành công.`,
                    duration: 2000
                  });
                  toast.present();
                });
              } else {
                const toast = await this.toastController.create({
                  message: 'Ngày bạn muốn sao chép chưa có thực đơn.',
                  duration: 2000
                });
                toast.present();
              }
            })
          })
        }
      },
    ]
  }
}
