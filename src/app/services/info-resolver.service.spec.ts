import { TestBed } from '@angular/core/testing';

import { InfoResolverService } from './info-resolver.service';

describe('InfoResolverService', () => {
  let service: InfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
