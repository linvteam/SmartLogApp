import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupingComponent } from './event-grouping.component';

describe('EventGroupingComponent', () => {
  let component: EventGroupingComponent;
  let fixture: ComponentFixture<EventGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGroupingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
