import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowItemsComponent } from './borrow-items.component';

describe('BorrowItemsComponent', () => {
  let component: BorrowItemsComponent;
  let fixture: ComponentFixture<BorrowItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
