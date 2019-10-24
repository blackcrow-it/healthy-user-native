import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../../services/callapi.service'
import { Identities } from '../../models/identities';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private _callApiService: CallApiService,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    public navCtrl: NavController
  ) { }

  async clickLogin() {

    var identity = new Identities();

    identity.email = this.email
    identity.password = this.password
    console.log(this.email);

    const loading = await this.loadingController.create({
      message: 'Đang đăng nhập ...'
    });
    await loading.present();
    
    this._callApiService.login(identity)
      .subscribe(
        resp => {
          console.log(resp.status)
          if (resp.status == 200) {
            // console.log(resp.body.token)
            this.authService.login(resp.body.token);
            loading.dismiss();
            // this.router.navigate(['tabs']);
          }
        }
      )
  }

  ngOnInit() {
    this.email = "quanghungleo@gmail.com";
    this.password = "123456"
  }

  clickRegister() {
    // this.navCtrl.navigateBack(['info']);
    this.navCtrl.navigateForward(['register']);
  }

}
