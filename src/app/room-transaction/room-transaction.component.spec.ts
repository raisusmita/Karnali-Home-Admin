import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTransactionComponent } from './room-transaction.component';

describe('RoomTransactionComponent', () => {
  let component: RoomTransactionComponent;
  let fixture: ComponentFixture<RoomTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
