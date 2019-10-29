import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { WeightApi } from 'src/app/services/api/weight.service';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.page.html',
  styleUrls: ['./add-weight.page.scss'],
})
export class AddWeightPage implements OnInit {
  today = new Date();
  tomorrow = new Date();
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  weight: number;

  weightLast = 55;

  constructor(public navCtrl: NavController, private weightAPI: WeightApi, private toastController: ToastController) { }

  ngOnInit() {
  }

  onClose() {
    this.navCtrl.navigateBack(['tabs/progress']);
  }
  
  onSaveWeight() {
    var choseTime = this.convertStingToTimestamp(this.date)
    if(this.weight){
      this.weightAPI.updateWeight(this.weight, choseTime).then(ob => {
        ob.subscribe(res => {
          this.presentToast('Cập nhật cân nặng thành công.');
          this.navCtrl.navigateBack(['tabs/progress']);
        }, error => {
          this.presentToast('Chưa cập nhật được cân nặng.');
        })
      })
    } else {
      this.presentToast('Vui lòng nhập cân nặng.');
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async changeDate() {
  } 

  convertStingToTimestamp(dateString: string) {
    var date_split = dateString.split("-")
    var date = date_split[2]
    var month = date_split[1]
    var year = date_split[0]
    var dateTimestamp = (new Date(parseInt(year), parseInt(month), parseInt(date))).getTime();
    return dateTimestamp
  }
}
