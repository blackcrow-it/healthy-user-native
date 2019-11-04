import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Food } from '../../models/food';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getExercise(exerciseId): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + `/api/exercises/${exerciseId}`, { headers: headers });
  }
  
}
