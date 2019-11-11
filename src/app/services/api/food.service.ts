import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Food } from '../../models/food'

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class FoodApi {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getFood(foodId): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json;');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + `/api/foods/${foodId}`, { headers: headers });
  }

  async createFood(food:Food): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json;');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.post(environment.URL_API + `/api/foods/create`, food, { headers: headers });
  }
}
