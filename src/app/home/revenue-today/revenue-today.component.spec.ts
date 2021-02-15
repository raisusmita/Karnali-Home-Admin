import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueTodayComponent } from './revenue-today.component';

describe('RevenueTodayComponent', () => {
  let component: RevenueTodayComponent;
  let fixture: ComponentFixture<RevenueTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
