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

  foods = [
    {
      "data": [
        {
          "id": "a",
          "name": "Trứng",
          "quantity": 7,
          "unit": "quả to",
          "kcal": 72
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 10,
          "unit": "gram",
          "kcal": 2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 7,
          "unit": "quả vừa",
          "kcal": 63
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
          "kcal": 72
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 5,
          "unit": "gram",
          "kcal": 2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 3,
          "unit": "quả vừa",
          "kcal": 63
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
          "kcal": 72
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 1,
          "unit": "gram",
          "kcal": 2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 4,
          "unit": "quả vừa",
          "kcal": 63
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
          "kcal": 72
        },
        {
          "id": "b",
          "name": "Thịt",
          "quantity": 9,
          "unit": "gram",
          "kcal": 2
        },
        {
          "id": "c",
          "name": "Trứng",
          "quantity": 7,
          "unit": "quả vừa",
          "kcal": 63
        }
      ],
      "title": "Bữa phụ"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
