import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveReservationComponent } from './remove-reservation.component';

describe('RemoveReservationComponent', () => {
  let component: RemoveReservationComponent;
  let fixture: ComponentFixture<RemoveReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
