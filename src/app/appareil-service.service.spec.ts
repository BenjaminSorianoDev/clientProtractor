import { TestBed, inject } from '@angular/core/testing';

import { AppareilServiceService } from './appareil-service.service';

describe('AppareilServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppareilServiceService]
    });
  });

  it('should be created', inject([AppareilServiceService], (service: AppareilServiceService) => {
    expect(service).toBeTruthy();
  }));
});
