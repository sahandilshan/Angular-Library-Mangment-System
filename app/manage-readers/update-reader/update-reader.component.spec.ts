import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReaderComponent } from './update-reader.component';

describe('UpdateReaderComponent', () => {
  let component: UpdateReaderComponent;
  let fixture: ComponentFixture<UpdateReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
