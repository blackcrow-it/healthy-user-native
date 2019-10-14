import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFoodsPage } from './shop-foods.page';

describe('ShopFoodsPage', () => {
  let component: ShopFoodsPage;
  let fixture: ComponentFixture<ShopFoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
