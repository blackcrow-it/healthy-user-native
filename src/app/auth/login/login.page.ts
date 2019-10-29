import { Component, OnInit } from '@angular/core';
import { Identities } from '../../models/identities';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/api/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  regexEmail = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}"

  constructor(
    private _callApiService: AuthService,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public formBuilder: FormBuilder
  ) { }

  async onSubmit() {
    var identity = new Identities();

    identity.email = this.loginForm.value.email
    identity.password = this.loginForm.value.password

    const loading = await this.loadingController.create({
      message: 'Đang đăng nhập ...'
    });
    await loading.present();
    
    this._callApiService.login(identity)
      .subscribe(
        resp => {
          this.authService.login(resp.token);
          loading.dismiss();
        }, error => {
          loading.dismiss();
          console.log(error)
          this.alertError("Đăng nhập không thành công. Vui lòng đăng nhập lại.")
        }
      )
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:[null , [Validators.required , Validators.pattern(this.regexEmail)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  clickRegister() {
    // this.navCtrl.navigateBack(['info']);
    this.navCtrl.navigateForward(['register']);
  }

  async alertError(msg) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
