import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MainBarFormComponent } from './main-bar-form.component'

describe('FoodFormComponent', () => {
  let component: MainBarFormComponent
  let fixture: ComponentFixture<MainBarFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainBarFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBarFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
