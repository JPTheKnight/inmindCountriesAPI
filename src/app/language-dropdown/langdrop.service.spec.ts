import { TestBed } from '@angular/core/testing';

import { LangdropService } from './langdrop.service';

describe('LangdropService', () => {
  let service: LangdropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangdropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
