import { Component, OnInit } from '@angular/core';
import { callApiService } from '../../services/callapi.service'
import { Identities } from 'src/app/models/identities';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = "eve.holt@reqres.in"
  password = "cityslicka"

  constructor(private _callApiService: callApiService, private router: Router, private authService: AuthenticationService) { }

  clickLogin() {

    var identity = new Identities();

    identity.username = this.username
    identity.password = this.password
    console.log(this.username);

    this._callApiService.login(identity)
    .subscribe(
      resp => {
        console.log(resp.status)
        if (resp.status == 200) {
          this.authService.login();
          // this.router.navigate(['tabs']);
        }
      }
    )
  }

  ngOnInit() {
    
  }

}
