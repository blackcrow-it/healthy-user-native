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

  async addOneFoodToMenu(time, foodId, quantity, meal): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json;');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    if(meal == 'break_fast'){
      meal = 'breakfast'
    } 
    let food = {
      "meals": [
        {
          "food_id": foodId,
          "quantity": quantity
        }
      ],
      "type": meal
    }
    console.log(food)
    return await this.httpclient.put(environment.URL_API + `/api/menu/${time}`, food, { headers: headers });
  }

  async editOneFoodToMenu(meal_detail_id, quantity): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.put(environment.URL_API + `/api/menu/meal/${meal_detail_id}?quantity=${quantity}`, null, { headers: headers });
  }

  async editStatusFoodToMenu(meal_detail_id, status: boolean): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.put(environment.URL_API + `/api/menu/meal/${meal_detail_id}?status=${status}`, null, { headers: headers });
  }

  async removeOneFoodToMenu(meal_detail_id): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.delete(environment.URL_API + `/api/menu/food/${meal_detail_id}`, { headers: headers });
  }

  async addOneExerciseToMenu(time, exerciseId): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    let exercise = {
      "exercises": [
        {
          "exercise_id": exerciseId
        }
      ],
      "type": 'exercise'
    }
    return await this.httpclient.put(environment.URL_API + `/api/menu/${time}`, exercise, { headers: headers });
  }

  async removeOneExerciseToMenu(exercise_detail_id): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.delete(environment.URL_API + `/api/menu/exercise/${exercise_detail_id}`, { headers: headers });
  }


}
