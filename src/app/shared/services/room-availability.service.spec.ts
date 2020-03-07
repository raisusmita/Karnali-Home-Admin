import { TestBed } from '@angular/core/testing';

import { RoomAvailabilityService } from './room-availability.service';

describe('RoomAvailabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomAvailabilityService = TestBed.get(RoomAvailabilityService);
    expect(service).toBeTruthy();
  });
});
