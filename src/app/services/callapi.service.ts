import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identities } from '../models/identities';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Profile } from '../models/profile';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: "root"
  })
export class CallApiService {
    constructor(private httpclient: HttpClient, private storage: Storage) { }
    
    login(identity:Identities): Observable<any> {
        return this.httpclient.post(environment.URL_API + "/account/login", identity, { observe: 'response' });
    }

    createNutrition(): Observable<any> {
        return this.httpclient.post(environment.URL_API + "/account/login", {}, { observe: 'response' });
    }

    createProfile(profile:Profile): Observable<any> {
        let httpOptions = {};
        this.storage.get(TOKEN_KEY).then(res => {
            console.log(res)
            httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + res,
                })
            };
        });
        console.log(httpOptions['headers'])
        return this.httpclient.post(environment.URL_API + "/api/user-profiles/create", profile, { headers: httpOptions['headers'] });
    }

    getMenu() {
        return this.httpclient.get(environment.URL_API + "/api/menu/getAll");
    }
}