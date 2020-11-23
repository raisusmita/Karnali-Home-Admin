import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SubFoodFormComponent } from './sub-food-form.component'

describe('SubFoodFormComponent', () => {
  let component: SubFoodFormComponent
  let fixture: ComponentFixture<SubFoodFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubFoodFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFoodFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
