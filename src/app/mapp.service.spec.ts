import { TestBed } from '@angular/core/testing';

import { MappService } from './mapp.service';

describe('MappService', () => {
  let service: MappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
