import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/api/exercise.service'

@Component({
  selector: 'app-user-exercises',
  templateUrl: './user-exercises.page.html',
  styleUrls: ['./user-exercises.page.scss'],
})
export class UserExercisesPage implements OnInit {
  exercise_name: string;
  index_of_sets: number;
  repetitions: number;
  weight_per_set: number;
  calories_burn: number;

  constructor(private exerciseApi: ExerciseService) { }

  ngOnInit() {
  }

  createExercise() {
    var exercise = new Exercise();
    exercise.exercise_name = this.exercise_name;
    exercise.index_of_sets = this.index_of_sets;
    exercise.repetitions = this.repetitions;
    exercise.weight_per_set = this.weight_per_set;
    exercise.calories_burn = this.calories_burn;
    this.exerciseApi.createExercise(exercise).then(ob => {
      ob.subscribe(res => {
        console.log(res);
        this.exercise_name = null;
        this.index_of_sets = null;
        this.repetitions = null;
        this.weight_per_set = null;
        this.calories_burn = null;
      })
    })
  }
}
