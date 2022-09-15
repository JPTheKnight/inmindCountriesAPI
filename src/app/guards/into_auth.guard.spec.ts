import { TestBed } from '@angular/core/testing';

import { IntoAuthGuard } from './into_auth.guard';

describe('CanActivateGuard', () => {
  let guard: IntoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IntoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
