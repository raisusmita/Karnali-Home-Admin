import { TestBed } from '@angular/core/testing'

import { UserRoleManagementService } from './user-role-management.service'

describe('UserRoleManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: UserRoleManagementService = TestBed.get(
      UserRoleManagementService
    )
    expect(service).toBeTruthy()
  })
})
