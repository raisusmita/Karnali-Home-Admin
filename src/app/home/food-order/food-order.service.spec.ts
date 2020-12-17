import { TestBed } from '@angular/core/testing'

import { FoodOrderService } from './food-order.service'

describe('FoodOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: FoodOrderService = TestBed.get(FoodOrderService)
    expect(service).toBeTruthy()
  })
})
