import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.page.html',
  styleUrls: ['./add-weight.page.scss'],
})
export class AddWeightPage implements OnInit {
  today = new Date();
  tomorrow = new Date();
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

  weightLast = 55;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  onClose() {
    this.navCtrl.navigateBack(['tabs/progress']);
  }
  
  onSaveWeight() {
    this.navCtrl.navigateBack(['tabs/progress']);
  }

  async changeDate() {
  } 

}
