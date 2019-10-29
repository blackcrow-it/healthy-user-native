import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { PasswordMeter } from '../../helpers/password-meter';
import { AuthService } from 'src/app/services/api/auth.service';
import { Identities } from 'src/app/models/identities';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  regexEmail = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}"

  constructor(public formBuilder: FormBuilder, private authService: AuthService, public alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email:[null , [Validators.required , Validators.pattern(this.regexEmail)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(false)
      return;
    } else {
      var identity = new Identities();
      identity.email = this.registerForm.value.email
      identity.password = this.registerForm.value.password
      this.authService.register(identity).subscribe(res => {
        if(res.success == true) {
          this.alertSuccess("Đăng ký tài khoản thành công.")
        } else {
          this.alertError("Tài khoản đã tồn tại.")
        }
      }, error => {
        this.alertError("Đăng ký thất bại.")
      })
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

  checkPass(value) {
    console.log(PasswordMeter(value));
  }
}
