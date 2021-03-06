import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Exercise } from '../../models/exercise';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private httpclient: HttpClient, private storage: Storage) { }

  async getExercise(exerciseId): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json;');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.get(environment.URL_API + `/api/exercises/${exerciseId}`, { headers: headers });
  }
  
  async createExercise(exercise:Exercise): Promise<Observable<any>> {
    let headers = new HttpHeaders();
    await this.storage.get(TOKEN_KEY).then(res => {
      headers = headers.set('Content-Type', 'application/json;');
      headers = headers.set('Authorization', 'Bearer ' + res);
    });
    return await this.httpclient.post(environment.URL_API + `/api/exercises/create`, exercise, { headers: headers });
  }
}
