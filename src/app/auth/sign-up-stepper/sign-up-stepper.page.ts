import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { AuthService } from '../../services/api/auth.service';
import { ProfileService } from '../../services/api/profile.service';
import { WeightApi } from '../../services/api/weight.service';
import { NutritionApi } from '../../services/api/nutrition.service';
import { Identities } from '../../models/identities';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Profile } from '../../models/profile';
import { Nutrition } from '../../models/nutrition';
import { Storage } from '@ionic/storage';
import * as uuid from 'uuid';
import { AuthenticationService } from '../../services/authentication.service';

const STEP = 'step';

@Component({
  selector: 'app-sign-up-stepper',
  templateUrl: './sign-up-stepper.page.html',
  styleUrls: ['./sign-up-stepper.page.scss'],
})
export class SignUpStepperPage implements OnInit {
  typeGoal: number;
  typeActive;

  weight = null;
  height = 170;

  weightGoal = null;

  maxWeight = 0;
  minWeight = 0;
  normalWeight = 0;

  isOptional = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fiveFormGroup: FormGroup;

  statusError = 0;

  registerForm: FormGroup;
  submitted = false;
  regexEmail = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}";

  today = new Date();
  minYear = this.formatDate(new Date(this.today.getFullYear() - 90, this.today.getMonth(), this.today.getDate()));
  maxYear = this.formatDate(new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate()));

  fullname: string;
  birthday: string;
  phonenumber: string;
  gender: string;

  weightPerWeek = '0.2';

  formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }
    return year + '-' + (month) + '-' + day;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private profileAPI: ProfileService,
    private weightAPI: WeightApi,
    private nutritionApi: NutritionApi,
    private storage: Storage,
    private authenService: AuthenticationService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      typeGoal: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      typeActive: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.fourFormGroup = this._formBuilder.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      weightGoal: [''],
    });
    this.fiveFormGroup = this._formBuilder.group({
      weightPerWeek: ['0.2']
    });

    this.registerForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.regexEmail)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

    this.maxWeight = await this.height - 100;
    this.minWeight = await Math.round(this.maxWeight * 8 / 10 * 10) / 10;
    this.normalWeight = await Math.round(this.maxWeight * 9 / 10 * 10) / 10;

  }

  async changeHeight() {
    this.maxWeight = await this.height - 100;
    this.minWeight = await Math.round(this.maxWeight * 8 / 10 * 10) / 10;
    this.normalWeight = await Math.round(this.maxWeight * 9 / 10 * 10) / 10;
    if (this.weightGoal) {
      if (this.weightGoal < this.minWeight) {
        this.statusError = -1;
      } else if (this.weightGoal > this.maxWeight) {
        this.statusError = 1;
      } else {
        this.statusError = 0;
      }
    }
  }

  async changeWeightGoal() {
    if (this.weightGoal < this.minWeight) {
      this.statusError = -1;
    } else if (this.weightGoal > this.maxWeight) {
      this.statusError = 1;
    } else if (this.weightGoal <= this.maxWeight && this.minWeight <= this.weightGoal) {
      this.statusError = 0;
    }
  }

  async changeWeight() {
    this.weightGoal = this.weight;
  }

  get f() { return this.registerForm.controls; }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Đang xử lý dữ liệu'
    });
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      var identity = new Identities();
      identity.email = this.registerForm.value.email;
      identity.password = this.registerForm.value.password;
      await loading.present();
      this.authService.register(identity).subscribe(async res => {
        if (res.success == true) {
          // this.alertSuccess("Đăng ký tài khoản thành công.")
          await this.authService.login(identity).subscribe(res => {
            this.authenService.login(res.token).then(async res => {
              var profile = new Profile();
              profile.avatar_url = `https://gravatar.com/avatar/${uuid.v4().toString().replace('-', '')}?d=identicon&f=y`;
              var timeStampBirth = new Date(this.birthday);
              timeStampBirth.setHours(0, 0, 0, 0);
              console.log(this.birthday)
              console.log(Math.round(timeStampBirth.getTime()))
              profile.date_of_birth = Math.round(timeStampBirth.getTime());
              profile.full_name = this.fullname;
              profile.gender = this.gender;
              profile.height = this.height;
              profile.weight = this.weight;
              profile.phone = this.phonenumber;
              await this.profileAPI.createProfile(profile).then(ob => {
                ob.subscribe(async res => {
                  var today = new Date();
                  today.setHours(0, 0, 0, 0);
                  await this.weightAPI.updateWeight(profile.weight, today.getTime()).then(ob => {
                    ob.subscribe(async res => {
                      var nutrition = new Nutrition();
                      nutrition.weight = Math.abs(this.weight - this.weightGoal)
                      if(this.weight - this.weightGoal == 0) {
                        nutrition.month = 12
                      } else {
                        nutrition.month = Math.round(Math.abs(this.weight - this.weightGoal) / parseFloat(this.weightPerWeek) / 4 * 1) / 1
                      }
                      nutrition.activityLevel = parseInt(this.typeActive)
                      if(this.weight - this.weightGoal <= 0){
                        nutrition.type = 1
                      } else {
                        nutrition.type = -1
                      }
                      await this.nutritionApi.createNutrition(nutrition).then(ob => {
                        ob.subscribe(async res => {
                          await this.navCtrl.navigateForward(['login']);
                          await this.alertSuccess("Đăng ký tài khoản thành công.")
                        }, err => {
                        })
                      })
                    })
                  })
                }, error => {
                })
              })
            })
          })
        } else {
          this.alertError("Tài khoản đã tồn tại.")
        }
      }, error => {
        this.alertError("Đăng ký thất bại.")
      })
      await loading.dismiss();
      return;
    }
  }

  async alertError(msg) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertSuccess(msg) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: msg,
      buttons: [{
        text: 'Đăng nhập',
        handler: () => {
          this.navCtrl.navigateBack(['login']);
        }
      }]
    });
    await alert.present();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
