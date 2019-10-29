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
      "x": "01/09/2019",
      "y": 55
    },
    {
      "x": "03/09/2019",
      "y": 53
    },
    {
      "x": "02/09/2019",
      "y": 54
    },
    {
      "x": "04/09/2019",
      "y": 54.3
    },
    {
      "x": "05/09/2019",
      "y": 57
    },
    {
      "x": "08/09/2019",
      "y": 56
    },
  ]

  history_weigth = []

  constructor(public navCtrl: NavController, private weightAPI: WeightApi) { }

  ngOnInit() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    // 1 tuần trước
    var weekAgo = today.setDate(today.getDate() - 1);

    for (let item of this.data.reverse()) {
      this.history_weigth.push({
        "date": convert_date_to_vi(item['x']),
        "weigth": item['y']
      })
    }

    function convert_date_to_vi(date_origin) {
      var date_split = date_origin.split("/")
      var date = date_split[0]
      var month = date_split[1]
      var year = date_split[2]
      return date + " tháng " + month + " năm " + year
    }

    this.bindData(1);
  }

  onAddWeight() {
    this.navCtrl.navigateForward(['add-weight']);
  }

  async bindData(endDate: number) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var dataWeight = [];
    await this.weightAPI.getWeight(today.getTime() / 1000, endDate).then(ob => {
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

    if (dataWeight) {
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
              data: this.data,
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
    console.log(startDate / 1000);
    console.log(endDate / 1000);
  }
}
