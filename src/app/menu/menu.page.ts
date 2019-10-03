import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  progressText = "g";
  progressCalo = "cal";
  progress = 0;
  titleCarbs = "242";
  titleFat = "20";
  titleProtein = "192";
  titleCalo = "2,075";

  constructor() { }

  ngOnInit() {
  }

}
