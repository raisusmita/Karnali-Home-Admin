import { TestBed } from '@angular/core/testing'

import { ConfirmCommonDialogService } from './confirm-common-dialog.service'

describe('ConfirmCommonDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ConfirmCommonDialogService = TestBed.get(
      ConfirmCommonDialogService
    )
    expect(service).toBeTruthy()
  })
})
