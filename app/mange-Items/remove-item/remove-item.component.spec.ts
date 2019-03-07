import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveItemComponent } from './remove-item.component';

describe('RemoveItemComponent', () => {
  let component: RemoveItemComponent;
  let fixture: ComponentFixture<RemoveItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
