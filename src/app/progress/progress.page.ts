import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { NavController } from '@ionic/angular';
import { WeightApi } from '../services/api/weight.service';

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
      "x": "03/09/2019",
      "y": 53
    },
    {
      "x": "02/09/2019",
      "y": 54
    },
    {
      "x": "08/09/2019",
      "y": 50
    },
  ]

  history_weigth = []

  constructor(public navCtrl: NavController, private weightAPI: WeightApi) { }

  ngOnInit() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    // 1 tuần trước
    var weekAgo = today.setDate(today.getDate() - 7);

    // history
    this.weightAPI.getWeight(0, (new Date()).getTime()/1000).then(ob => {
      ob.subscribe(res => {
        for (let item of res.data.reverse()) {
          this.history_weigth.push({
            "date": convert_date_to_vi(this.convertTimestampToString(item['date'])),
            "weigth": item['weight']
          })
        }
      }, error => {
        for (let item of this.data.reverse()) {
          this.history_weigth.push({
            "date": convert_date_to_vi(item['x']),
            "weigth": item['y']
          })
        }
      })
    })

    

    function convert_date_to_vi(date_origin) {
      var date_split = date_origin.split("/")
      var date = date_split[0]
      var month = date_split[1]
      var year = date_split[2]
      return date + " tháng " + month + " năm " + year
    }

    this.bindData(weekAgo/1000);
  }

  onAddWeight() {
    this.navCtrl.navigateForward(['add-weight']);
  }

  async bindData(startDate: number) {
    console.log(startDate)
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var dataWeight = [];
    await this.weightAPI.getWeight(startDate, today.getTime() / 1000).then(ob => {
      ob.subscribe(res => {
        if (res.data) {
          res.data.forEach(item => {
            dataWeight.push({
              x: this.convertTimestampToString(item['date']),
              y: item['weight']
            })
          });
        }
      })
    })

    if (await dataWeight.length != 0) {
      dataWeight.sort((a, b) => a.x.localeCompare(b.x))

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
                tooltipFormat: 'll'
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
        console.log(item)
        list_day.push(item['day'])
        list_weight.push(item['weight'])
      }

      this.lineChart = new Chart(this.lineCanvas.nativeElement, config)

    } else {
      console.log(true);
      dataWeight = this.data;
      dataWeight.sort((a, b) => a.x.localeCompare(b.x))

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
                tooltipFormat: 'll'
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
        console.log(item)
        list_day.push(item['day'])
        list_weight.push(item['weight'])
      }

      this.lineChart = new Chart(this.lineCanvas.nativeElement, config)
    }
  }

  convertTimestampToString(timestamp: number) {
    var date = new Date(timestamp * 1000);
    date.toLocaleDateString()
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yyyy = date.getFullYear();
    var format = dd + '/' + mm + '/' + yyyy;
    console.log(format)
    return format;
  }

  selectTime(object) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var value = object.detail.value;
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

    this.bindData(startDate/1000);
  }
}
