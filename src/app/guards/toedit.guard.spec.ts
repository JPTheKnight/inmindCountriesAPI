import { TestBed } from '@angular/core/testing';

import { ToeditGuard } from './toedit.guard';

describe('ToeditGuard', () => {
  let guard: ToeditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ToeditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
