import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { BarNameFormComponent } from './bar-name-form.component'

describe('FoodFormComponent', () => {
  let component: BarNameFormComponent
  let fixture: ComponentFixture<BarNameFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarNameFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BarNameFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
