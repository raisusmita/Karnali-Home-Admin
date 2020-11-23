import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RoomTransactionFormComponent } from './room-transaction-form.component'

describe('RoomTransactionFormComponent', () => {
  let component: RoomTransactionFormComponent
  let fixture: ComponentFixture<RoomTransactionFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTransactionFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTransactionFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
