import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NotifyService } from '../services/api/notify.service'

const TOKEN_KEY = 'auth-token';
const STEP = 'step';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private oneSignal: OneSignal, private notifyApi: NotifyService) {
    this.plt.ready().then(() => {
      this.checkToken();
    })
  }

  login(token: string) {
    return this.storage.set(TOKEN_KEY, token).then(async res => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    this.oneSignal.getIds().then((id) => {
      this.notifyApi.deleteSegment(id.userId).then(ob => {
        ob.subscribe(res => {
          console.log(res);
        })
      });
    });
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(STEP);
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }
}
