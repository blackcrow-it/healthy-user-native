import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/api/exercise.service';
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { FoodMenuApi } from '../services/api/food-menu.service';
import { ToastController, NavController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const SELECT_TIME = 'selecttime';
const SELECT_MEAL = 'meal';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.page.html',
  styleUrls: ['./excercise.page.scss'],
})
export class ExcercisePage implements OnInit {
  video_url : SafeUrl;
  
  data = {
    calories_burn: 0,
    exercise_detail_id: 0,
    exercise_id: 0,
    exercise_name: "SQUART",
    index_of_sets: 0,
    repetitions: 0,
    video_url: "",
    weight_per_set: 0
  }

  type = 'create'

  constructor(
    private exerciseAPI: ExerciseService, 
    private navService: DataService, 
    private storage: Storage, 
    private menuApi: FoodMenuApi, 
    private toastController: ToastController, 
    public navCtrl: NavController,
    private sanitizer: DomSanitizer
    ) { }

  async ngOnInit() {
    await this.getExercise(this.navService.get('exercise_id'));
    this.type = this.navService.get('type_exercise');
    if(this.data.video_url){
      this.video_url = await this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video_url);
    } 
  }

  getExercise(id){
    this.exerciseAPI.getExercise(id).then(ob => {
      ob.subscribe(res => {
        this.data = res['data']
        console.log(this.data)
      })
    })
  }

  async onSaveExercise() {
    await this.storage.get(SELECT_TIME).then(async res => {
      this.menuApi.addOneExerciseToMenu(res, this.data.exercise_id).then(ob => {
        ob.subscribe(async res => {
          const toast = await this.toastController.create({
            message: 'Đã thêm bài tập.',
            duration: 1000
          });
        toast.present();
        this.navCtrl.navigateBack(['tabs/menu'])
        }, async err => {
          const toast = await this.toastController.create({
            message: 'Bài tập chưa được thêm.',
            duration: 1000
          });
          toast.present();
        })
      })
    })
  }
}
