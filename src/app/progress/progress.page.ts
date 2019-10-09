import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  @ViewChild("lineCanvas", {static: true}) lineCanvas: ElementRef;

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

  constructor() { }

  ngOnInit() {
    this.data.sort((a,b) => a.x.localeCompare(b.x))

    let list_day = []
    let list_weight = []

    var timeFormat = 'DD/MM/YYYY';

    function convert_date_to_vi(date_origin) {
      var date_split = date_origin.split("/")
      var date = date_split[0]
      var month = date_split[1]
      var year = date_split[2]
      return date + " tháng " + month + " năm " + year
    }

    for (let item of this.data.reverse()) {
      this.history_weigth.push({
        "date": convert_date_to_vi(item['x']),
        "weigth": item['y']
      })
    }

    var config = {
      type:    'line',
      data:    {
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
          title:      {
              display: true,
              text:    "Biểu đồ cân nặng"
          },
          legend: {
              display: false,
          },
          scales:     {
              xAxes: [{
                  type:       "time",
                  time:       {
                      displayFormats: {
                          'day': 'DD/MM'
                      }, 
                      format: timeFormat,
                      tooltipFormat: 'll'
                  },
                  scaleLabel: {
                      display:     false,
                      labelString: 'day'
                  }
              }],
              yAxes: [{
                  scaleLabel: {
                      display:     false,
                      labelString: 'weight'
                  }
              }]
          }
      }
  };

    for (let item of this.data) {
      list_day.push(item['day'])
      list_weight.push(item['weight'])
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, config)

    

    for (let item of this.data) {
      console.log(item['day'])
    }
  }

}
