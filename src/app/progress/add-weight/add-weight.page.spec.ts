import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightPage } from './add-weight.page';

describe('AddWeightPage', () => {
  let component: AddWeightPage;
  let fixture: ComponentFixture<AddWeightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
