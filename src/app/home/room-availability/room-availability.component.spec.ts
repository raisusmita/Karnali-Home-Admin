import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAvailabilityComponent } from './room-availability.component';

describe('RoomAvailabilityComponent', () => {
  let component: RoomAvailabilityComponent;
  let fixture: ComponentFixture<RoomAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
