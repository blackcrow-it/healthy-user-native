import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular'
import { Storage } from '@ionic/storage';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { NotificationService } from '../../services/notification.service';

const BF_TIME = 'breakfast-time';
const BF_STATUS = 'breakfast-status';
const BF_ID = 1;

const LU_TIME = 'lunch-time';
const LU_STATUS = 'lunch-status';
const LU_ID = 2;

const DN_TIME = 'dinner-time';
const DN_STATUS = 'dinner-status';
const DN_ID = 3;

const SN_TIME = 'snack-time';
const SN_STATUS = 'snack-status';
const SN_ID = 4;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  schedule = [];
  breakfastTime: string;
  breakfastStatus: boolean;
  lunchTime: string;
  lunchStatus: boolean;
  dinnerTime: string;
  dinnerStatus: boolean;
  snackTime: string;
  snackStatus: boolean;

  constructor(
    private plt: Platform, 
    private localNotifications: LocalNotifications,
    private storage: Storage,
    private notificationServices: NotificationService) {
    this.plt.ready().then(() => {
      this.storage.get(BF_TIME).then((res) => {
        if (res == null) {
          this.storage.set(BF_TIME, "08:00");
          this.breakfastTime = "08:00"
        } else {
          this.breakfastTime = res
        }
      })
      this.storage.get(BF_STATUS).then((res) => {
        if (res == null) {
          this.storage.set(BF_STATUS, true);
          this.breakfastStatus = true
        } else {
          this.breakfastStatus = res
        }
      })

      this.storage.get(LU_TIME).then((res) => {
        if (res == null) {
          this.storage.set(LU_TIME, "12:00");
          this.lunchTime = "12:00"
        } else {
          this.lunchTime = res
        }
      })
      this.storage.get(LU_STATUS).then((res) => {
        if (res == null) {
          this.storage.set(LU_STATUS, true);
          this.lunchStatus = true
        } else {
          this.lunchStatus = res
        }
      })

      this.storage.get(DN_TIME).then((res) => {
        if (res == null) {
          this.storage.set(DN_TIME, "19:00");
          this.dinnerTime = "19:00"
        } else {
          this.dinnerTime = res
        }
      })
      this.storage.get(DN_STATUS).then((res) => {
        if (res == null) {
          this.storage.set(DN_STATUS, true);
          this.dinnerStatus = true
        } else {
          this.dinnerStatus = res
        }
      })

      this.storage.get(SN_TIME).then((res) => {
        if (res == null) {
          this.storage.set(SN_TIME, "14:00");
          this.snackTime = "14:00"
        } else {
          this.snackTime = res
        }
      })
      this.storage.get(SN_STATUS).then((res) => {
        if (res == null) {
          this.storage.set(SN_STATUS, true);
          this.snackStatus = true
        } else {
          this.snackStatus = res
        }
      })

    })
  }

  ngOnInit() {
  }

  async breakfastChange() {
    await this.notificationServices.setStorage(BF_TIME, this.breakfastTime)
    await this.notificationServices.updateNotification(BF_ID, BF_TIME, BF_STATUS, 'Đến giờ ăn sáng')
  }
  async breakfastChangeStatus() {
    await this.notificationServices.setStorage(BF_STATUS, this.breakfastStatus)
    await this.notificationServices.updateNotification(BF_ID, BF_TIME, BF_STATUS, 'Đến giờ ăn sáng')
  }

  async lunchChange() {
    await this.notificationServices.setStorage(LU_TIME, this.lunchTime)
    await this.notificationServices.updateNotification(LU_ID, LU_TIME, LU_STATUS, 'Đến giờ ăn trưa')
  }
  async lunchChangeStatus() {
    await this.notificationServices.setStorage(LU_STATUS, this.lunchStatus)
    await this.notificationServices.updateNotification(LU_ID, LU_TIME, LU_STATUS, 'Đến giờ ăn trưa')
  }

  async dinnerChange() {
    await this.notificationServices.setStorage(DN_TIME, this.dinnerTime)
    await this.notificationServices.updateNotification(DN_ID, DN_TIME, DN_STATUS, 'Đến giờ ăn tối')
  }
  async dinnerChangeStatus() {
    await this.notificationServices.setStorage(DN_STATUS, this.dinnerStatus)
    await this.notificationServices.updateNotification(DN_ID, DN_TIME, DN_STATUS, 'Đến giờ ăn tối')
  }

  async snackChange() {
    await this.notificationServices.setStorage(SN_TIME, this.snackTime)
    await this.notificationServices.updateNotification(SN_ID, SN_TIME, SN_STATUS, 'Đến giờ ăn phụ')
  }
  async snackChangeStatus() {
    await this.notificationServices.setStorage(SN_STATUS, this.snackStatus)
    await this.notificationServices.updateNotification(SN_ID, SN_TIME, SN_STATUS, 'Đến giờ ăn phụ')
  }
}
