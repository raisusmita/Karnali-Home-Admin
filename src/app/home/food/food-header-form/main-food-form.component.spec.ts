import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFoodFormComponent } from './food-header-form.component';

describe('FoodFormComponent', () => {
  let component: MainFoodFormComponent;
  let fixture: ComponentFixture<MainFoodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainFoodFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFoodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
