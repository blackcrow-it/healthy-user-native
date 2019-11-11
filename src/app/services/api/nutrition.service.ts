import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Nutrition } from '../../models/nutrition';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class NutritionApi {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getNutrition(token?): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    if (token != null) {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + token);
    } else {
      await this.storage.get(TOKEN_KEY).then(res => {
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer ' + res);
      });
    }
    return await this.httpclient.get(environment.URL_API + `/api/my-goal`, { headers: headers});
  }

  async createNutrition(nutrition:Nutrition): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      console.log('In Nutrition')
      console.log(res)
      console.log(nutrition)
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.post(environment.URL_API + "/api/nutrition", nutrition, { headers: headers });
  }
}
