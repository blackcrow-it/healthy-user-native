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
export class NotifyService {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async addSegment(player_id: string, token?: string): Promise<Observable<any>>  {
    let headers = new HttpHeaders();

    if(token) {
      headers = headers.set('Content-Type', 'application/json;');
      headers = headers.set('Authorization', 'Bearer ' + token);
    } else {
      await this.storage.get(TOKEN_KEY).then(res => {
        headers = headers.set('Content-Type', 'application/json;');
        headers = headers.set('Authorization', 'Bearer ' + res);
      });
    }
    return await this.httpclient.post(environment.URL_API + "/segment/new", { player_id: player_id}, { headers: headers });
  }

  async deleteSegment(player_id: string): Promise<Observable<any>>  {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.post(environment.URL_API + "/segment/delete", { player_id: player_id}, { headers: headers });
  }

  async getNotify(): Promise<Observable<any>>  {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + "/api/notify/", { headers: headers });
  }
}
