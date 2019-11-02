import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { SearchApi } from '../../services/api/search.service'

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
  

  constructor(private httpclient: HttpClient, public navCtrl: NavController, private searchApi: SearchApi) { }

  ngOnInit() {
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadData(event, value) {
    this.searchApi.findFood(value).then(ob => {
      ob.subscribe(res => {
        this.data = this.data.concat(res['data']);
        console.log(res)
      })
    })
    // this.httpclient.get(`https://randomuser.me/api/?results=10&page=${this.page}`, { observe: 'response' })
    // .subscribe(resp => {
    //   this.data = this.data.concat(resp['body']['results']);

    //   if (this.page == 0) {
    //     this.infiniteScroll.disabled = false;
    //   }

    //   if (event) {
    //     event.target.complete();
    //     console.log("loaddata")

    //   }
    // })
  }

  // async loadMore(event) {
  //   this.page++;
  //   this.loadData(event);

  //   if (this.page === this.maxinumPages) {
  //     event.target.disabled = true;
  //   }
  // }

  async changeSearch(event){
    this.page = 0;
    this.data = [];
    this.searchValue = this.textSearch;
    if (this.searchValue) {
      this.spinner = true;
      await this.loadData(event, this.searchValue);
      this.spinner = false;
    }
  }

  public clickFood(food_id) {
    this.navCtrl.navigateForward(['food/' + food_id]);
  }

}
