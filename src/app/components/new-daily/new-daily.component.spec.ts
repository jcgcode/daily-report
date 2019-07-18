import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDailyComponent } from './new-daily.component';

describe('NewDailyComponent', () => {
  let component: NewDailyComponent;
  let fixture: ComponentFixture<NewDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDailyComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
