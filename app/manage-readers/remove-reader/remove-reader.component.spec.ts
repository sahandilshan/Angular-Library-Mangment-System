import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveReaderComponent } from './remove-reader.component';

describe('RemoveReaderComponent', () => {
  let component: RemoveReaderComponent;
  let fixture: ComponentFixture<RemoveReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
