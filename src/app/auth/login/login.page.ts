import { Component, OnInit } from '@angular/core';
import { callApiService } from '../../services/callapi.service'
import { Identities } from 'src/app/models/identities';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = "eve.holt@reqres.in"
  password = "cityslicka"

  constructor(
    private _callApiService: callApiService, 
    private router: Router, 
    private authService: AuthenticationService, 
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async clickLogin() {

    var identity = new Identities();

    identity.username = this.username
    identity.password = this.password
    console.log(this.username);

    const loading = await this.loadingController.create({
      message: 'Đang đăng nhập ...'
    });
    await loading.present();
    
    this._callApiService.login(identity)
      .subscribe(
        resp => {
          console.log(resp.status)
          if (resp.status == 200) {
            this.authService.login();
            loading.dismiss();
            // this.router.navigate(['tabs']);
          }
        }
      )
  }

  ngOnInit() {

  }

}
