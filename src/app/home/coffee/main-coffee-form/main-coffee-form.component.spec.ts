import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MainCoffeeFormComponent } from './main-coffee-form.component'

describe('FoodFormComponent', () => {
  let component: MainCoffeeFormComponent
  let fixture: ComponentFixture<MainCoffeeFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainCoffeeFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCoffeeFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
