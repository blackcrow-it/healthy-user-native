import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private modalController: ModalController) { }
  async close() {
    await this.modalController.dismiss();
  }
  ngOnInit() {
  }

}
