import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonFab, IonBackdrop } from '@ionic/angular';
import { SearchPage } from '../search/search.page';
import { ActionSheetController } from '@ionic/angular';
import { DataService } from '../services/data.service'
import { Storage } from '@ionic/storage';
import { FoodMenuApi } from '../services/api/food-menu.service';
import { ProfileService } from '../services/api/profile.service';

const SELECT_MENU = 'select';
const SELECT_TIME = 'selecttime';
const SELECT_MEAL = 'meal';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('fabButton', { static: false }) fabRef: IonFab;
  @ViewChild('backDrop', { static: false }) dropRef: IonBackdrop;

  avatar: string;
  dropBack = false;
  
  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private navService: DataService,
    private storage: Storage,
    private menuAPI: FoodMenuApi,
    private profileApi: ProfileService,
    ) { }

  ngOnInit() {
    this.profileApi.getProfile().then(ob => {
      ob.subscribe(res => {
        console.log(res)
        this.avatar = res.data['avatar_url']
      })
    })
  }

  async showModalSearch() {
    const modal = await this.modalController.create({
      component: SearchPage
    });
    return await modal.present();
  }

  clickProfile(){
    this.navService.push('more');
  }

  fabClick(){
    this.dropBack = !this.fabRef.activated
  }

  clickAddWeight(){
    var date = new Date();
    date.setHours(0, 0, 0, 0)
    var dateTimestamp = date.getTime()
    this.navService.push('tabs/progress/add-weight', {'date': dateTimestamp })
  }

  clickAddExercise(){
    this.addFoods('exercise');
  }

  async clickAddFood() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Chọn bữa ăn',
      buttons: [{
        text: 'Bữa Sáng',
        role: 'destructive',
        icon: 'information-circle-outline',
        handler: () => {
          this.addFoods('break_fast');
        }
      }, {
        text: 'Bữa Trưa',
        icon: 'information-circle-outline',
        handler: () => {
          this.addFoods('lunch');
        }
      }, {
        text: 'Bữa Tối',
        icon: 'information-circle-outline',
        handler: () => {
          this.addFoods('dinner');
        }
      }, {
        text: 'Bữa Phụ',
        icon: 'information-circle-outline',
        handler: () => {
          this.addFoods('snacks');
        }
      }, {
        text: 'Thoát',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  addFoods(type: string) {
    var menu_id;
    var date = new Date();
    date.setHours(0, 0, 0, 0)
    var dateTimestamp = date.getTime()
    this.menuAPI.getMenubyDate(dateTimestamp).then(ob => {
      ob.subscribe(res => {
        var data = res['data']
        if (data) {
          menu_id = data['day_id']
        } else {
          menu_id = null
        }
      }, error => {
        menu_id = null
      })
    })
    this.storage.set(SELECT_MEAL, type)
    this.storage.set(SELECT_MENU, menu_id)
    this.storage.set(SELECT_TIME, dateTimestamp)
    // this.navCtrl.navigateForward(['tabs-search']);
    this.navService.push('tabs-search', { 'type': type })
  }
}
