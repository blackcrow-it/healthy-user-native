import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Identities } from '../models/identities';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class callApiService {
    constructor(private httpclient: HttpClient) { }
    
    login(identity:Identities): Observable<any> {
        return this.httpclient.post(environment.DOMAIN + environment.API_LOGIN, identity, { observe: 'response' });
    }
}