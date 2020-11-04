import { TestBed } from '@angular/core/testing';

import { DefaultRequestOptionsService } from './default-request-options.service';

describe('DefaultRequestOptionsService', () => {
  let service: DefaultRequestOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultRequestOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
