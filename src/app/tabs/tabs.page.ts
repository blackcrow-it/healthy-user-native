import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async showModalSearch() {
    const modal = await this.modalController.create({
      component: SearchPage
    });
    return await modal.present();
  }
}
