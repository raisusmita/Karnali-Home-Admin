import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTableComponent } from './available-table.component';

describe('AvailableTableComponent', () => {
  let component: AvailableTableComponent;
  let fixture: ComponentFixture<AvailableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
