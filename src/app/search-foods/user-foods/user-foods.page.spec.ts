import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFoodsPage } from './user-foods.page';

describe('UserFoodsPage', () => {
  let component: UserFoodsPage;
  let fixture: ComponentFixture<UserFoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
