import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
// import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import { CallApiService } from './services/callapi.service';
// import { NavigationExtras } from '@angular/router';


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
    private callApi: CallApiService
  ) {
    this.initializeApp();
  }

  index(){
    return this.httpclient.get(environment.URL_API + "/account/index");
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // this.authService.login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoZWFsdGh5IiwianRpIjoicXVhbmdodW5nbGVvQGdtYWlsLmNvbSJ9.l2va3rfGmNQF-dkCQ_orzWR6TLAKJ_rfpVRnWaD2Lns");
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        console.log(state)
        if (state) {
          // this.callApi.index().subscribe(res => {
          //   if (res['data']['userProfile']){
          //     this.navCtrl.navigateForward(['tabs']);
          //   } else {
          //     this.navCtrl.navigateForward(['info']);
          //   }
          // })
          this.navCtrl.navigateForward(['tabs']);
        } else {
          this.navCtrl.navigateBack(['login']);
        }
      });
    });
  }
}
