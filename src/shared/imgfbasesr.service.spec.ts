import { TestBed } from '@angular/core/testing';

import { ImgfbasesrService } from './imgfbasesr.service';

describe('ImgfbasesrService', () => {
  let service: ImgfbasesrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgfbasesrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
