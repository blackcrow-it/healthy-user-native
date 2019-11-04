import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from "chart.js";
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { WeightApi } from '../services/api/weight.service';
import { NutritionApi } from '../services/api/nutrition.service';
import { DataService } from '../services/data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;

  private lineChart: Chart;

  data = [
    {
      "x": "04/09/2019",
      "y": 53
    },
    {
      "x": "03/09/2019",
      "y": 54
    },
    {
      "x": "02/09/2019",
      "y": 50
    },
    {
      "x": "01/09/2019",
      "y": 50
    },
    {
      "x": "30/08/2019",
      "y": 50
    }
  ]

  history_weigth = []

  start_weight = 0;
  finish_weight = 0;
  current_weight = 0;
  change_weight = 0;
  perchange_weight = 0;
  type_change = 0;

  select_time = 'one-week';

  constructor(
    private weightAPI: WeightApi,
    private nutritionAPI: NutritionApi,
    private alertController: AlertController,
    private toastController: ToastController,
    private navService: DataService,
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.activeRoute.params.subscribe(data => {
      this.ngOnInit();
      this.changeDetector.detectChanges();
    })
  }

  async ngOnInit() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    // 1 tuần trước
    var weekAgo = today.setDate(today.getDate() - 7);
    await this.getHistory();
    await this.nutritionAPI.getNutrition().then(ob => {
      ob.subscribe(async res => {
        this.start_weight = await res.weightStart
        this.finish_weight = await res.weightFinish
        if (res.type) {
          this.type_change = await res.type
        } else {
          this.type_change = 1
        }
        this.change_weight = await this.current_weight - this.start_weight;
        if (this.start_weight != 0) {
          this.perchange_weight = await Math.round(100 / this.start_weight * this.change_weight * 10) / 10;
        }
      })
    })
    await this.bindData(weekAgo);
  }

  onAddWeight() {
    // this.navCtrl.
    this.navService.push('tabs/progress/add-weight', { 'weight': null, 'date': null })
  }

  async bindData(startDate: number) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var dataWeight = [];
    await this.weightAPI.getWeight(startDate, (new Date()).getTime()).then(ob => {
      ob.subscribe(res => {
        if (res.data) {
          res.data.sort(compare).reverse();
          res.data.forEach(item => {
            dataWeight.push({
              "x": this.convertTimestampToString(item['date']),
              "y": item['weight']
            })
          });
          // dataWeight.sort((a, b) => a.x.localeCompare(b.x))

          let list_day = []
          let list_weight = []

          var timeFormat = 'DD/MM/YYYY';

          var config = {
            type: 'line',
            data: {
              datasets: [
                {
                  label: "Cân nặng",
                  data: dataWeight,
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "#f04141",
                  borderColor: "#f04141",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBorderColor: "#f04141",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "#f04141",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                }
              ]
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: "Biểu đồ cân nặng"
              },
              legend: {
                display: false,
              },
              scales: {
                xAxes: [{
                  type: "time",
                  time: {
                    displayFormats: {
                      'day': 'DD/MM'
                    },
                    format: timeFormat,
                    tooltipFormat: 'DD/MM'
                  },
                  scaleLabel: {
                    display: false,
                    labelString: 'day'
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: false,
                    labelString: 'weight'
                  }
                }]
              }
            }
          };

          for (let item of dataWeight) {
            list_day.push(item['day'])
            list_weight.push(item['weight'])
          }

          this.lineChart = new Chart(this.lineCanvas.nativeElement, config)
        }
      })
    })

    function compare(a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    }
  }

  convertTimestampToString(timestamp: number) {
    var date = new Date(timestamp);
    date.toLocaleDateString()
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yyyy = date.getFullYear();
    if (dd < 10) {
      var format = '0' + dd + '/' + mm + '/' + yyyy;
    } else {
      var format = dd + '/' + mm + '/' + yyyy;
    }
    return format;
  }

  selectTime(object) {
    var value = object.detail.value;
    this.appendDataToChart(value)
  }

  appendDataToChart(value) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var startDate: number;
    var endDate = today.getTime();
    if (value == "one-week") {
      var newToday = new Date();
      newToday.setHours(0, 0, 0, 0);
      startDate = newToday.setDate(newToday.getDate() - 7);
    } else if (value == "one-month") {
      var newToday = new Date();
      newToday.setHours(0, 0, 0, 0);
      startDate = newToday.setMonth(newToday.getMonth() - 1);
    } else if (value == "two-months") {
      var newToday = new Date();
      newToday.setHours(0, 0, 0, 0);
      startDate = newToday.setMonth(newToday.getMonth() - 2);
    } else if (value == "three-months") {
      var newToday = new Date();
      newToday.setHours(0, 0, 0, 0);
      startDate = newToday.setMonth(newToday.getMonth() - 3);
    } else if (value == "six-months") {
      var newToday = new Date();
      newToday.setHours(0, 0, 0, 0);
      startDate = newToday.setMonth(newToday.getMonth() - 6);
    } else if (value == "one-year") {
      var newToday = new Date();
      newToday.setHours(0, 0, 0, 0);
      startDate = newToday.setFullYear(newToday.getFullYear() - 1);
    }

    this.bindData(startDate);
  }

  async getHistory() {
    // history
    await this.weightAPI.getWeight(0, (new Date()).getTime()).then(ob => {
      ob.subscribe(async res => {
        if (res.data) {
          res.data.sort(compare).reverse();
          this.current_weight = res.data[0].weight
          this.history_weigth = [];
          for (let item of res.data) {
            if (item['weight']) {
              this.history_weigth.push({
                "date": convert_date_to_vi(this.convertTimestampToString(item['date'])),
                "weigth": item['weight'],
                "time": item['date']
              })
            }
          }
        }

      }, error => {

      })
    })

    function convert_date_to_vi(date_origin) {
      var date_split = date_origin.split("/")
      var date = date_split[0]
      var month = date_split[1]
      var year = date_split[2]
      return date + " tháng " + month + " năm " + year
    }

    function compare(a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    }
  }

  async deleteWeight(time: number, date: string) {
    const alert = await this.alertController.create({
      header: 'Cảnh báo!',
      message: `Bạn có chắc chắn xóa cân nặng <strong> ngày ${date}</strong> không?`,
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Xóa',
          handler: () => {
            this.weightAPI.deleteWeight(time).then(ob => {
              ob.subscribe(res => {
                this.getHistory();
                this.appendDataToChart(this.select_time);
                this.presentToast("Xoá dữ liệu thành công.")
              }, err => {
                this.presentToast("Xoá dữ liệu không thành công.")
              })
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  editWeight(weight: number, time: number) {
    this.navService.push('tabs/progress/add-weight', { 'weight': weight, 'date': time })
    // this.navCtrl.navigateForward(['add-weight'], {weight: 50, date: 1212121})
  }
}


