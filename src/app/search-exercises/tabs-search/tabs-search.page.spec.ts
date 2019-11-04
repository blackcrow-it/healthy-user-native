import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSearchPage } from './tabs-search.page';

describe('TabsSearchPage', () => {
  let component: TabsSearchPage;
  let fixture: ComponentFixture<TabsSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
