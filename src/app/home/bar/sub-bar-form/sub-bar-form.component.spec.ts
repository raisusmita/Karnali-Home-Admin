import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SubBarFormComponent } from './sub-bar-form.component'

describe('SubBarFormComponent', () => {
  let component: SubBarFormComponent
  let fixture: ComponentFixture<SubBarFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubBarFormComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SubBarFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
