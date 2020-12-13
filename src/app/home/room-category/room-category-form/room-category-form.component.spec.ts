import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RoomCategoryFormComponent } from './room-category-form.component'

describe('RoomCategoryFormComponent', () => {
  let component: RoomCategoryFormComponent
  let fixture: ComponentFixture<RoomCategoryFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomCategoryFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCategoryFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
