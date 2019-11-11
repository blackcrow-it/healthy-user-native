import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';

const INFORMATION = 'information-status';
const STEP = 'step';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    // private router: Router,
    public navCtrl: NavController,
    private httpclient: HttpClient,
    private storage: Storage,
    private oneSignal: OneSignal,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  index() {
    return this.httpclient.get(environment.URL_API + "/account/index");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.authService.login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoZWFsdGh5IiwianRpIjoicXVhbmdodW5nbGVvQGdtYWlsLmNvbSJ9.l2va3rfGmNQF-dkCQ_orzWR6TLAKJ_rfpVRnWaD2Lns");
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.setupPush();
      }

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.navCtrl.navigateForward(['tabs/progress']);
        } else {
          this.navCtrl.navigateBack(['login']);
        }
      });
    });
  }

  setupPush() {
    this.oneSignal.startInit("c0d45dc5-22e2-438e-ad98-cca6044cd095", "1052520095301");

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let additionalData = data.notification.payload.additionalData;
      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: `Action; ${task}`,
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}
