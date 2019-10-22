import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular'
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  schedule = [];

  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        console.log('click: ', res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg)
      });
      this.localNotifications.on('trigger').subscribe(res => {
        console.log('trigger: ', res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg)
      });
    })
  }

  ngOnInit() {
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'My first notification',
      text: 'Thats pretty easy...',
      // foreground: true,
      data: { mydata: 'My hidden msg this is'},
      trigger: {
        in: 5,
        unit: ELocalNotificationTriggerUnit.SECOND
      }
    });

    // this.localNotifications.schedule({
    //   title: 'My first notification',
    //   text: 'Thats pretty easy...',
    //   foreground: true,
    //   data: { page: 'My hidden msg this is'},
    //   trigger: { at: new Date(new Date().getTime() + 5 * 1000)}
    // });
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recurring',
      text: 'Thats pretty easy... recurring',
      // foreground: true,
      data: { mydata: 'My hidden msg this is'},
      trigger: {
        every : ELocalNotificationTriggerUnit.MINUTE
      }
    });
  }

  repeatingDaily() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Goodmorning',
      text: 'Epic today!',
      // foreground: true,
      data: { mydata: 'My hidden msg this is'},
      trigger: {
        every : {
          hour: 11,
          minute: 59
        }
      }
    });
  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.schedule = res;
    })
  }

  async showAlert(header, sub, msg) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
