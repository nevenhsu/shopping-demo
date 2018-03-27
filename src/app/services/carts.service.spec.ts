import { TestBed, inject } from '@angular/core/testing';

import { CartsService } from './carts.service';

describe('CartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartsService]
    });
  });

  it('should be created', inject([CartsService], (service: CartsService) => {
    expect(service).toBeTruthy();
  }));
});
