import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOrderDetailComponent } from './food-order-detail.component';

describe('FoodOrderDetailComponent', () => {
  let component: FoodOrderDetailComponent;
  let fixture: ComponentFixture<FoodOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
