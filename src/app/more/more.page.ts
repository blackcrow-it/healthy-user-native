import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(private authService: AuthenticationService, public navCtrl: NavController) { }

  clickLogout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

  onClickProfile() {
    this.navCtrl.navigateForward(['profile']);
  }

  onClickGoal() {
    this.navCtrl.navigateForward(['goals']);
  }

  onClickRemind() {
    this.navCtrl.navigateForward(['notification']);
  }

  takePhoto() {

  }

  getPhotoGallery() {

  }

}
