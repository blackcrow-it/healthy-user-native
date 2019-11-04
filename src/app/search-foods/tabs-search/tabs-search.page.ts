import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tabs-search',
  templateUrl: './tabs-search.page.html',
  styleUrls: ['./tabs-search.page.scss'],
})
export class TabsSearchPage implements OnInit {

  type: string;

  constructor(public navCtrl: NavController, private navService: DataService) { }

  ngOnInit() {
    this.type = this.navService.get('type');
  }

  closeSearch() {
    this.navCtrl.navigateBack(['tabs/menu'])
  }

}
