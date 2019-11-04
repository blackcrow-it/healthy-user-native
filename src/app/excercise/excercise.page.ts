import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/api/exercise.service';
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { FoodMenuApi } from '../services/api/food-menu.service';
import { ToastController, NavController } from '@ionic/angular';

const SELECT_TIME = 'selecttime';
const SELECT_MEAL = 'meal';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.page.html',
  styleUrls: ['./excercise.page.scss'],
})
export class ExcercisePage implements OnInit {
  video_url: "https://www.youtube.com/embed/7kP8Qnu2TJ8?list=RDEMTeD5S482iCxsXK7AGnkQ1g"
  data = {
    calories_burn: 0,
    exercise_detail_id: 4,
    exercise_id: 1,
    exercise_name: "SQUART",
    index_of_sets: 12,
    repetitions: 3,
    video_url: "https://www.youtube.com/embed/7kP8Qnu2TJ8?list=RDEMTeD5S482iCxsXK7AGnkQ1g",
    weight_per_set: 40
  }

  constructor(private exerciseAPI: ExerciseService, private navService: DataService, private storage: Storage, private menuApi: FoodMenuApi, private toastController: ToastController, public navCtrl: NavController) { }

  ngOnInit() {
    this.getExercise(this.navService.get('exercise_id'))
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
