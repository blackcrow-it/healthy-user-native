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
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoZWFsdGh5IiwianRpIjoicXVhbmdodW5nbGVvQGdtYWlsLmNvbSJ9.l2va3rfGmNQF-dkCQ_orzWR6TLAKJ_rfpVRnWaD2Lns');
    return this.httpclient.post(environment.URL_API + "/account/login", identity, { headers: headers });
  }

  register(identity:Identities): Observable<any> {
    return this.httpclient.post(environment.URL_API + "/account/register", identity);
  }
}
