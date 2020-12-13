import { TestBed } from '@angular/core/testing'

import { RoomCategoryService } from './room-category.service'

describe('RoomCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: RoomCategoryService = TestBed.get(RoomCategoryService)
    expect(service).toBeTruthy()
  })
})
