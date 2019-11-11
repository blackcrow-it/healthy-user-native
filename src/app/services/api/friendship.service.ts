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
export class FriendshipService {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getPeople(email?: string): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + `/api/friendship/getAll?search=${email}`, { headers: headers});
  }

  async sendAddFriend(email: string): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.post(environment.URL_API + `/api/friendship/create`, {receive_email: email}, { headers: headers});
  }

  async accept(email: string): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.put(environment.URL_API + `/api/friendship/accept`, {receive_email: email}, { headers: headers});
  }

  async decline(email: string): Promise<Observable<any>> {
  
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.put(environment.URL_API + `/api/friendship/decline`, {receive_email: email}, { headers: headers});
  }

  async getFriend(date: number, email?: string, status?: number): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    if(status) {
      return await this.httpclient.get(environment.URL_API + `/api/friendship/getAllByStatus?date=${date}&search=${email}&sttRemaining=${status}`, { headers: headers});
    } else {
      return await this.httpclient.get(environment.URL_API + `/api/friendship/getAllFriend?date=${date}&search=${email}`, { headers: headers});
    }
  }

  async getListRequestsFriend(): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + `/api/friendship/getListRequest`, { headers: headers});
  }

}
