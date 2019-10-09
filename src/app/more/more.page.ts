import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  clickLogout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
