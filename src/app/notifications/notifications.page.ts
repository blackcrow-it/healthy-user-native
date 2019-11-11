import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotifyService } from '../services/api/notify.service'
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  isEmpty = true;
  data = [];

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
    private notifyApi: NotifyService,
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private loadingController: LoadingController
    ) {
    this.activeRoute.params.subscribe(data => {
      this.ngOnInit();
      this.changeDetector.detectChanges();
    })
  }

  ngOnInit() {
    this.presentLoading();
    this.notifyApi.getNotify().then(ob => {
      ob.subscribe(res => {
        if(res.data){
          this.data = res.data;
          this.isEmpty = false;
          this.dismissLoading();
        }
      })
    })
  }

}
