import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMainComponent } from './history-main.component';

describe('HistoryMainComponent', () => {
  let component: HistoryMainComponent;
  let fixture: ComponentFixture<HistoryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
