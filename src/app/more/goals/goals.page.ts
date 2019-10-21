import { Component, OnInit } from '@angular/core';

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
    activity: "high"
  }

  constructor() { }

  ngOnInit() {
  }

}
