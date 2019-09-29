import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  weight = '';
  height = '';
  arrayNatural = [];
  arrayDecimal = [];
  arrayHeight = [];
  optsWeight: PickerOptions = {
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Done'
      }
    ],
    columns: [
      {
        name: 'natural',
        options: this.arrayNatural
      },
      {
        name: 'decimal',
        options: this.arrayDecimal
      },
      {
        name: 'unit',
        options: [
          { text : 'kg', value : ''}
        ]
      }
    ]
  };

  optsHeight: PickerOptions = {
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Done'
      }
    ],
    columns: [
      {
        name: 'height',
        options: this.arrayHeight
      },
      {
        name: 'unit',
        options: [
          { text : ' cm', value : ''}
        ]
      }
    ]
  };

  constructor(private pickerController: PickerController) { }

  ngOnInit() {
    for (let index = 0; index <= 300; index++) {
      let dictWeight = { text: index, value: index };
      this.arrayNatural.push(dictWeight);
      this.arrayHeight.push(dictWeight);
    }
    for (let index = 0; index <= 9; index++) {
      let dictWeight = { text: "." + index, value: index };
      this.arrayDecimal.push(dictWeight);
    }
  }

  async showWeightPicker() {
    let picker = await this.pickerController.create(this.optsWeight);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let colNatural = await picker.getColumn('natural');
      let colDecimal = await picker.getColumn('decimal');
      this.weight = colNatural.options[colNatural.selectedIndex].text + colDecimal.options[colDecimal.selectedIndex].text + " kg";
    });
  }

  async showHeightPicker() {
    let picker = await this.pickerController.create(this.optsHeight);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('height');
      this.height = col.options[col.selectedIndex].text + " cm";
    });
  }

}
