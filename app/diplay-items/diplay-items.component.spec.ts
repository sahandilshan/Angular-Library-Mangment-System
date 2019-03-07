import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplayItemsComponent } from './diplay-items.component';

describe('DiplayItemsComponent', () => {
  let component: DiplayItemsComponent;
  let fixture: ComponentFixture<DiplayItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplayItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplayItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
