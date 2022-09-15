import { TestBed } from '@angular/core/testing';

import { OutOfAuthGuard } from './out-of-auth.guard';

describe('OutOfAuthGuard', () => {
  let guard: OutOfAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OutOfAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
