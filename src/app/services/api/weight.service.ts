import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class WeightApi {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getWeight(startDate: number, endDate: number): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.set('startDate', startDate.toString());
    params = params.set('endDate', endDate.toString());
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + "/api/weight", { headers: headers });
  }

  async updateWeight(weight: number): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    var today = new Date();
    today.setHours(0,0,0,0);
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.post(environment.URL_API + "/api/weights", { weight: weight, date: today.getTime()/1000}, { headers: headers });
  }

}
