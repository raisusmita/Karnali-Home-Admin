import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDetailComponent } from './available-detail.component';

describe('AvailableDetailComponent', () => {
  let component: AvailableDetailComponent;
  let fixture: ComponentFixture<AvailableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
