import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCommonDialogComponent } from './confirm-common-dialog.component';

describe('ConfirmCommonDialogComponent', () => {
  let component: ConfirmCommonDialogComponent;
  let fixture: ComponentFixture<ConfirmCommonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCommonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCommonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
