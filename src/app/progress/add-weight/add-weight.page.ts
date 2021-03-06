import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { WeightApi } from '../../services/api/weight.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.page.html',
  styleUrls: ['./add-weight.page.scss'],
})
export class AddWeightPage implements OnInit {
  today = new Date();
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  weight: number;

  weightLast = 55;

  //Add Loading
  loading = this.loadingController.create({
    message: 'Đang xử lý dữ liệu',
  });
  presentLoading(){
    this.loading.then(ob =>{
      ob.present();
    })
  }
  dismissLoading(){
    this.loading.then(ob =>{
      ob.dismiss();
    })
  }

  constructor(
    private weightAPI: WeightApi,
    private toastController: ToastController,
    private navService: DataService,
    private navCtrl: NavController,
    private router: Router,
    public loadingController: LoadingController
    ) { }

  async ngOnInit() {
    this.presentLoading();
    this.today.setHours(0, 0, 0, 0)
    if (this.navService.get('date')) {
      this.today = new Date(this.navService.get('date'));
      this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    }
    this.weightAPI.getWeight(this.today.getTime(), this.today.getTime()).then(ob => {
      ob.subscribe(async res => {
        await this.dismissLoading();
        this.weight = res.data[0].weight
      })
    })
    this.weightAPI.getWeight(0, (new Date()).getTime()).then(ob => {
      ob.subscribe(async res => {
        await this.dismissLoading();
        this.weightLast = res.data[0].weight
      })
    })
  }

  onClose() {
    this.navCtrl.back();
  }
  
  async onSaveWeight() {
    var choseTime = this.convertStingToTimestamp(this.date)
    if(this.weight){
      var loading = await this.loadingController.create({
        message: 'Đang xử lý dữ liệu',
      });
      loading.present()
      this.weightAPI.updateWeight(this.weight, choseTime).then(ob => {
        ob.subscribe(res => {
          console.log(res)
          this.presentToast('Cập nhật cân nặng thành công.');
          if (res.message.includes("Save")) {
            this.navService.pop('tabs/progress', {status: 'edit'});
          } else {
            this.navService.pop('tabs/progress', {status: 'add'});
          }
          loading.dismiss()
        }, error => {
          loading.dismiss()
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
    var dateTimestamp = (new Date(parseInt(year), parseInt(month) - 1, parseInt(date))).getTime();
    return dateTimestamp
  }
}
