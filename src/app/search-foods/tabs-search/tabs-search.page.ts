import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs-search',
  templateUrl: './tabs-search.page.html',
  styleUrls: ['./tabs-search.page.scss'],
})
export class TabsSearchPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  closeSearch() {
    this.navCtrl.navigateBack(['tabs'])
  }

}
