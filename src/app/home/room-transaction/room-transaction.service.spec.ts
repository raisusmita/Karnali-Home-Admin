import { TestBed } from '@angular/core/testing';

import { RoomTransactionService } from './room-transaction.service';

describe('RoomTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomTransactionService = TestBed.get(RoomTransactionService);
    expect(service).toBeTruthy();
  });
});
