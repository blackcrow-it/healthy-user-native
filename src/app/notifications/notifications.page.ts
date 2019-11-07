import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/api/notify.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  isEmpty = true;
  data: any;

  constructor(private notifyApi: NotifyService) { }

  ngOnInit() {
    this.notifyApi.getNotify().then(ob => {
      ob.subscribe(res => {
        if(res.data){
          this.data = res.data;
          this.isEmpty = false;
        }
      })
    })
  }

}
