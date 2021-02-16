import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideOrderOverviewComponent } from './side-order-overview.component';

describe('SideOrderOverviewComponent', () => {
  let component: SideOrderOverviewComponent;
  let fixture: ComponentFixture<SideOrderOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideOrderOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideOrderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
