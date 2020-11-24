import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RoomAvailabilityFormComponent } from './room-availability-form.component'

describe('RoomAvailabilityFormComponent', () => {
  let component: RoomAvailabilityFormComponent
  let fixture: ComponentFixture<RoomAvailabilityFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomAvailabilityFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAvailabilityFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
