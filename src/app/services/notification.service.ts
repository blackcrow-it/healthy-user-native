import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private storage: Storage, private plt: Platform, private localNotifications: LocalNotifications) {
    this.plt.ready().then(() => {
    })

  }

  setStorage(key, value) {
    this.storage.set(key, value);
  }

  repeatingDaily(id: number, key: string, title: string) {
    this.storage.get(key).then((res) => {
      let hour = parseInt(res.split(':')[0])
      let minute = parseInt(res.split(':')[1])
      this.localNotifications.schedule({
        id: id,
        title: title,
        text: 'Created',
        // foreground: true,
        trigger: {
          every: {
            hour: hour,
            minute: minute
          },
          count: 1
        }
      });
    });
  }

  removeNotify(id: number) {
    this.localNotifications.isScheduled(id).then(res => {
      if (res) {
        this.localNotifications.cancel(id);
      }
    })
  }

  updateNotification(id: number, keyTime: string, keyStatus: string, title: string) {
    this.storage.get(keyStatus).then((res) => {
      console.log(res)
      if (res) {
        this.repeatingDaily(id, keyTime, title)
      }
      else {
        this.removeNotify(id)
      }
    })
  }
}
