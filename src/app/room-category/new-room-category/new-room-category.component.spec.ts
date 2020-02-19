import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewRoomCategoryComponent } from "./new-room-category.component";

describe("NewRoomCategoryComponent", () => {
  let component: NewRoomCategoryComponent;
  let fixture: ComponentFixture<NewRoomCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRoomCategoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoomCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
