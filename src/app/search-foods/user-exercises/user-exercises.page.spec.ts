import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExercisesPage } from './user-exercises.page';

describe('UserExercisesPage', () => {
  let component: UserExercisesPage;
  let fixture: ComponentFixture<UserExercisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserExercisesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExercisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
