import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Profile } from '../../models/profile';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getProfile(): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json;');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + "/api/user-profiles", { headers: headers });
  }

  async createProfile(profile:Profile, token?: string): Promise<Observable<any>> {
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
    return await this.httpclient.post(environment.URL_API + "/api/user-profiles/create", profile, { headers: headers });
  }

}
