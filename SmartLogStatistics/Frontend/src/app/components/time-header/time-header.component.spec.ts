import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeHeaderComponent } from './time-header.component';

describe('TimeHeaderComponent', () => {
  let component: TimeHeaderComponent;
  let fixture: ComponentFixture<TimeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
