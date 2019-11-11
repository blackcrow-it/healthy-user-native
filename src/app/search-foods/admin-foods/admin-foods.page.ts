import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { SearchApi } from '../../services/api/search.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin-foods',
  templateUrl: './admin-foods.page.html',
  styleUrls: ['./admin-foods.page.scss'],
})
export class AdminFoodsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  data = [];
  page = 0;
  maxinumPages = 3;
  textSearch = null;
  searchValue = null;
  status = false;
  spinner = false;
  lastText = null;

  events = null;

  type: string;
  

  constructor(private httpclient: HttpClient, public navCtrl: NavController, private searchApi: SearchApi, private navService: DataService) { }

  async ngOnInit() {
    this.type = this.navService.get('type');
    await this.loadData(' ');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async loadData(value) {
    this.spinner = true;
    if(this.type == 'exercise') {
      this.searchApi.findExercise(value).then(ob => {
        ob.subscribe(async res => {
          this.data = res['data'];
          console.log(this.data)
          this.spinner = await false;
        }, async () => {
          this.spinner = await false;
        })
      })
    } else {
      this.searchApi.findFood(value).then(ob => {
        ob.subscribe(async res => {
          this.data = res['data'];
          console.log(this.data)
          this.spinner = await false;
        }, async () => {
          this.spinner = await false;
        })
      })
    }
  }

  async changeSearch(event: any){
    this.page = 0;
    this.data = [];
    this.searchValue = event.target.value;
    if (event.target.value.replace(/\s+/g, '') != "") {
      await this.loadData(event.target.value);
    }
  }

  public clickFood(food_id) {
    this.navCtrl.navigateForward(['food/' + food_id]);
  }

  public clickExercise(exercise_id) {
    this.navService.push(`exercise`, {'exercise_id': exercise_id, type_exercise: 'add'});
  }

}
