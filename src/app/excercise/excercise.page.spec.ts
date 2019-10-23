import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcercisePage } from './excercise.page';

describe('ExcercisePage', () => {
  let component: ExcercisePage;
  let fixture: ComponentFixture<ExcercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
