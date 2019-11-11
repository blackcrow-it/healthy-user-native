import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotifyService } from '../services/api/notify.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  isEmpty = true;
  data = [];

  constructor(
    private notifyApi: NotifyService,
    private activeRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    ) {
    this.activeRoute.params.subscribe(data => {
      this.ngOnInit();
      this.changeDetector.detectChanges();
    })
  }

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
