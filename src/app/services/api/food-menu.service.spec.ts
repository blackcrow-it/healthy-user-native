import { TestBed } from '@angular/core/testing';

import { FoodMenuService } from './food-menu.service';

describe('FoodMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodMenuService = TestBed.get(FoodMenuService);
    expect(service).toBeTruthy();
  });
});
