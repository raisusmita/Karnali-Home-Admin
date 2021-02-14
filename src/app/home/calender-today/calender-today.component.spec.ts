import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderTodayComponent } from './calender-today.component';

describe('CalenderTodayComponent', () => {
  let component: CalenderTodayComponent;
  let fixture: ComponentFixture<CalenderTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
