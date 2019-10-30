import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
    private storage: Storage
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

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.storage.get(STEP).then(result => {
            console.log(result)
            if (result == 1) {
              this.navCtrl.navigateForward(['info']);
            } else if (result == 2) {
              this.navCtrl.navigateForward(['target']);
            } else if (result == 3) {
              this.navCtrl.navigateForward(['tabs']);
            }
            else {
              this.navCtrl.navigateForward(['login']);
            }
          })

        } else {
          this.navCtrl.navigateBack(['login']);
        }
      });
    });
  }
}
