import { TestBed } from '@angular/core/testing';

import { MongoServiceService } from './mongo-service.service';

describe('MongoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MongoServiceService = TestBed.get(MongoServiceService);
    expect(service).toBeTruthy();
  });
});
