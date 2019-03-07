import { TestBed } from '@angular/core/testing';

import { SnackbarServiceService } from './snackbar-service.service';

describe('SnackbarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackbarServiceService = TestBed.get(SnackbarServiceService);
    expect(service).toBeTruthy();
  });
});
