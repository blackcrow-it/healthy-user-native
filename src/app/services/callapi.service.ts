import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Identities } from '../models/identities';
import { Observable } from 'rxjs';

@Injectable()
export class callApiService {
    constructor(private httpclient: HttpClient) { }
    
    login(identity:Identities): Observable<any> {
        return this.httpclient.post("https://reqres.in/api/login", identity, { observe: 'response' });
    }
}