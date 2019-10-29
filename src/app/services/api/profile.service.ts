import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getProfile(): Promise<Observable<any>> {
    
    let headers = new HttpHeaders();
    // let httpOptions = {};
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    await console.log(headers)
    return await this.httpclient.get(environment.URL_API + "/api/user-profiles", { headers: headers });
  }

}
