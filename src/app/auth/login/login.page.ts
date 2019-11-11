import { Component, OnInit } from '@angular/core';
import { Identities } from '../../models/identities';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/api/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NutritionApi } from '../../services/api/nutrition.service'
import { NotifyService } from '../../services/api/notify.service'
import { OneSignal } from '@ionic-native/onesignal/ngx';

const TOKEN_KEY = 'auth-token';
const STEP = 'step';
const EMAIL = 'email';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  regexEmail = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}"
  msg: any;

  constructor(
    private authAPI: AuthService,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private oneSignal: OneSignal,
    private nutritionApi: NutritionApi,
    private notifyApi: NotifyService
  ) { }

  async onSubmit() {
    var identity = new Identities();

    identity.email = this.loginForm.value.email
    identity.password = this.loginForm.value.password

    const loading = await this.loadingController.create({
      message: 'Đang đăng nhập ...'
    });
    await loading.present();
    var check = await false;
    await this.authAPI.login(identity) 
      .subscribe(
        async resp => {
          this.storage.set(EMAIL, identity.email)
          await this.authService.login(resp.token);
          loading.dismiss();
          this.oneSignal.getIds().then((id) => {
            this.notifyApi.addSegment(id.userId, resp.token).then(ob => {
              ob.subscribe(res => {
                console.log(res);
              })
            })
          });
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
    // this.test()
  }

  clickRegister() {
    // this.oneSignal.getIds().then(value => {
    //   this.alertError(value.userId);
    // });
    this.navCtrl.navigateForward(['sign-up-stepper']);
  }

  async alertError(msg) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  test() {
    this.authAPI.test().subscribe(res => {
      console.log(res)
      this.msg = res.title
    })
  }
}
