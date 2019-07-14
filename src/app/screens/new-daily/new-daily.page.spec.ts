import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDailyPage } from './new-daily.page';

describe('NewDailyPage', () => {
  let component: NewDailyPage;
  let fixture: ComponentFixture<NewDailyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDailyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDailyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
