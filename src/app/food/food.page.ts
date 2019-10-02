import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

  private doughnutChart: Chart;

  constructor() { }

  ngOnInit() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Carbs", "Fat", "Protein"],
        datasets: [
          {
            label: "# of Votes",
            data: [2, 62, 36],
            backgroundColor: [
              "#3171e0",
              "#f04141",
              "#28e070"
            ]
          }
        ]
      },
      options: {
          responsive: true,
          legend: {
              display: false,
          }
      },
      centerText: {
          display: true,
          text: "280"
      }
    });

    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
    
        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        var cal = "72",
            textX = Math.round((width - ctx.measureText(cal).width) / 2),
            textY = height / 2;
    
        ctx.fillText(cal, textX, textY - 10);
        ctx.fillText("cal", Math.round((width - ctx.measureText("cal").width) / 2), textY + 10);
        ctx.save();
      }
    });
    

    Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
    Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
        draw: function (ease) {
            var ctx = this.chart.chart.ctx;
            
            var easingDecimal = ease || 1;
            Chart.helpers.each(this.getDataset().metaData, function (arc, index) {
                arc.transition(easingDecimal).draw();

                var vm = arc._view;
                var radius = (vm.outerRadius + vm.innerRadius) / 2;
                var thickness = (vm.outerRadius - vm.innerRadius) / 2;
                var angle = Math.PI - vm.endAngle - Math.PI / 2;
                
                ctx.save();
                ctx.fillStyle = vm.backgroundColor;
                ctx.translate(vm.x, vm.y);
                ctx.beginPath();
                ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
                ctx.arc(radius * Math.sin(Math.PI), radius * Math.cos(Math.PI), thickness, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });
        },
    });
  }

}
