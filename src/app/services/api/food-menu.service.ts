import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { FoodInMeal } from '../../models/meal'

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class FoodMenuApi {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getMenu(): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + "/api/menu/getAll", { headers: headers });
  }

  async getMenubyDate(timestamp: number): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + `/api/menu/getSingle?date=${timestamp}`, { headers: headers });
  }

  async createMenu(timestamp, food: FoodInMeal): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    let data = {
      "date": timestamp,
      "break_fast": [],
      "dinner": [],
      "lunch": [],
      "snacks": [],
      "exercises": []
    }
    var meal = food.type;
    data[meal] = [{
      food_id: food.food_id,
      quantity: food.quantity
    }]
    return await this.httpclient.post(environment.URL_API + `/api/menu/create`, data, { headers: headers });
  }

  async addOneFoodToMenu(menuId, foodId, quantity, meal): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    let food = {
      "meals": [
        {
          "food_id": foodId,
          "quantity": quantity
        }
      ],
      "type": meal
    }
    return await this.httpclient.put(environment.URL_API + `/api/menu/${menuId}`, food, { headers: headers });
  }
}
