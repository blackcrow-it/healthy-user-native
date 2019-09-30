import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-target',
  templateUrl: './target.page.html',
  styleUrls: ['./target.page.scss'],
})
export class TargetPage implements OnInit {
  weight = '';
  arrayNatural = [];
  arrayDecimal = [];
  optsWeight: PickerOptions = {
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Done',
        handler: (value) => {
          console.log(value);
          this.weight = value['natural']['text'] + value['decimal']['text'] + ' ' + value['unit']['text']
        }
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

  constructor(private pickerController: PickerController) { }

  ngOnInit() {
    for (let index = 0; index <= 300; index++) {
      let dictWeight = { text: index, value: index };
      this.arrayNatural.push(dictWeight);
    }
    for (let index = 0; index <= 9; index++) {
      let dictWeight = { text: "." + index, value: index };
      this.arrayDecimal.push(dictWeight);
    }
  }

  async showWeightPicker() {
    let picker = await this.pickerController.create(this.optsWeight);
    picker.present();
  }

}
