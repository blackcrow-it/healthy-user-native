import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identities } from '../../models/identities';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  login(identity:Identities): Observable<any> {
    return this.httpclient.post(environment.URL_API + "/account/login", identity);
  }

  register(identity:Identities): Observable<any> {
    return this.httpclient.post(environment.URL_API + "/account/register", identity);
  }
}
