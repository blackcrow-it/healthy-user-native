import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFoodsPage } from './admin-foods.page';

describe('AdminFoodsPage', () => {
  let component: AdminFoodsPage;
  let fixture: ComponentFixture<AdminFoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
