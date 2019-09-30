import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPage } from './target.page';

describe('TargetPage', () => {
  let component: TargetPage;
  let fixture: ComponentFixture<TargetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
