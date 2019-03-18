import { TestBed } from '@angular/core/testing';

import { FirebaseDataService } from './firebase.service';

describe('FirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseDataService = TestBed.get(FirebaseDataService);
    expect(service).toBeTruthy();
  });
});
