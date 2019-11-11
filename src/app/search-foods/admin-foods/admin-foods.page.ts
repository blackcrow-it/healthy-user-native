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

  ngOnInit() {
    this.type = this.navService.get('type');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadData(event, value) {
    if(this.type == 'exercise') {
      this.searchApi.findExercise(value).then(ob => {
        ob.subscribe(res => {
          this.data = this.data.concat(res['data']);
          console.log(this.data)
        })
      })
    } else {
      this.searchApi.findFood(value).then(ob => {
        ob.subscribe(res => {
          this.data = this.data.concat(res['data']);
          console.log(res)
        })
      })
    }
  }

  async changeSearch(event: any){
    this.page = 0;
    this.data = [];
    this.searchValue = event.target.value;
    if (event.target.value.replace(/\s+/g, '') != "") {
      this.spinner = true;
      await this.loadData(event, event.target.value);
      this.spinner = false;
    }
  }

  public clickFood(food_id) {
    this.navCtrl.navigateForward(['food/' + food_id]);
  }

  public clickExercise(exercise_id) {
    this.navService.push(`exercise`, {'exercise_id': exercise_id, type_exercise: 'add'});
  }

}
