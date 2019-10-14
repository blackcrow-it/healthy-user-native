import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  clickSuccess() {
    this.navCtrl.navigateForward(['tabs']);
  }
}
