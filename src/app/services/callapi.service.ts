import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identities } from '../models/identities';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: "root"
  })
export class CallApiService {
    constructor(private httpclient: HttpClient, private storage: Storage) { }
    
    login(identity:Identities): Observable<any> {
        return this.httpclient.post(environment.URL_API + "/account/login", identity, { observe: 'response' });
    }

    index(): Observable<any> {
        return this.httpclient.get(environment.URL_API + "/account/index");
    }

    createNutrition(): Observable<any> {
        return this.httpclient.post(environment.URL_API + "/account/login", {}, { observe: 'response' });
    }

    getMenu() {
        let httpOptions = {};
        this.storage.get(TOKEN_KEY).then(res => {
            httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + res
                })
            };
        });
        return this.httpclient.get(environment.URL_API + "/api/menu/getAll", { observe: 'response', headers: httpOptions['headers'] });
    }
}